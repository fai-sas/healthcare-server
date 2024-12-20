import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AuthServices } from './auth.service'
import { Request, Response } from 'express'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  const { refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  })

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Logged in successfully!',
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully!',
    data: result,
  })
})

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user

    const result = await AuthServices.changePassword(user, req.body)

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Password Changed successfully',
      data: result,
    })
  }
)

const forgotPassword = catchAsync(async (req, res) => {
  await AuthServices.forgotPassword(req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Check your email to get reset password link!',
    data: null,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || ''

  await AuthServices.resetPassword(token, req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Password Reset!',
    data: null,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
}
