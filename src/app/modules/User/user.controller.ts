import { Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import pick from '../../utils/pick'
import { userFilterableFields } from './user.constant'

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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

  const result = await userService.getAllUsersFromDB(filters, options)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Users data fetched!',
    meta: result.meta,
    data: result.data,
  })
})

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.changeProfileStatusIntoDb(id, req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Users profile status changed!',
    data: result,
  })
})

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  changeProfileStatus,
}
