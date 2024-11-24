import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { doctorFilterableFields } from './doctor.constants'
import pick from '../../utils/pick'
import { DoctorService } from './doctor.service'
import sendResponse from '../../utils/sendResponse'

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

  const result = await DoctorService.getAllDoctorsFromDB(filters, options)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctors retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DoctorService.getSingleDoctorFromDB(id)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctor retrieved successfully',
    data: result,
  })
})

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DoctorService.updateDoctorIntoDB(id, req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctor data updated!',
    data: result,
  })
})

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DoctorService.deleteDoctorFromDB(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully',
    data: result,
  })
})

const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DoctorService.doctorSoftDeleteFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Doctor soft deleted successfully',
    data: result,
  })
})

export const DoctorController = {
  updateDoctor,
  getAllDoctors,
  getSingleDoctor,
  deleteDoctor,
  softDelete,
}
