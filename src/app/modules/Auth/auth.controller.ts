import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AuthServices } from './auth.service'

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

export const AuthController = {
  loginUser,
}
