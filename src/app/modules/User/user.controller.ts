import { Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdminIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully!',
    data: result,
  })
})

export const userController = {
  createAdmin,
}
