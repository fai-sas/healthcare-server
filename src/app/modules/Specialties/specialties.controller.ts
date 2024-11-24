import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { SpecialtiesService } from './specialties.service'
import sendResponse from '../../utils/sendResponse'

const createSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.createSpecialtiesIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Specialties created successfully!',
    data: result,
  })
})

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.getAllSpecialtiesFromDB()

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Specialties data fetched successfully',
    data: result,
  })
})

const deleteSpecialties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SpecialtiesService.deleteSpecialtiesFromDB(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Specialty deleted successfully',
    data: result,
  })
})

export const SpecialtiesController = {
  createSpecialties,
  getAllSpecialties,
  deleteSpecialties,
}
