import { UserStatus } from '@prisma/client'
import prisma from '../../utils/prisma'
import * as bcrypt from 'bcrypt'
import { jwtHelpers } from '../../utils/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  })

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  )

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password!')
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  }
}

export const AuthServices = {
  loginUser,
}
