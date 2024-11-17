import { Admin, PrismaClient, UserRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import { TFile } from '../../interfaces/file'
import { imageUploader } from '../../utils/imageUploader'

const prisma = new PrismaClient()

const createAdminIntoDb = async (req: Request): Promise<Admin> => {
  const file = req.file as TFile

  if (file) {
    const uploadToCloudinary = await imageUploader.uploadToCloudinary(file)
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    })

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    })

    return createdAdminData
  })

  return result
}

export const userService = {
  createAdminIntoDb,
}
