import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import pick from '../../utils/pick'
import sendResponse from '../../utils/sendResponse'
import { patientFilterableFields } from './patient.constants'
import { PatientService } from './patient.services'

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

  const result = await PatientService.getAllPatientsFromDb(filters, options)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PatientService.getSinglePatientFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully',
    data: result,
  })
})

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PatientService.updatePatientIntoDb(id, req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient updated successfully',
    data: result,
  })
})

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PatientService.deletePatientFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient deleted successfully',
    data: result,
  })
})

const softDeletePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PatientService.softDeletePatientFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Patient soft deleted successfully',
    data: result,
  })
})

export const PatientController = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
  softDeletePatient,
}
