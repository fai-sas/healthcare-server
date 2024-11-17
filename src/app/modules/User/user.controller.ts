import { Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully!',
    data: result,
  })
})

const createDoctor = catchAsync(async (req, res) => {
  const result = await userService.createDoctorIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctor Created Successfully!',
    data: result,
  })
})

const createPatient = catchAsync(async (req, res) => {
  const result = await userService.createPatientIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient Created Successfully!',
    data: result,
  })
})

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
}
