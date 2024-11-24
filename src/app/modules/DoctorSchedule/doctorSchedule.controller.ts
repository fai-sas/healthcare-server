import { Request, Response } from 'express'
import { TAuthUser } from '../../interfaces/common'
import catchAsync from '../../utils/catchAsync'
import { DoctorScheduleService } from './doctorSchedule.service'
import sendResponse from '../../utils/sendResponse'
import pick from '../../utils/pick'
import { scheduleFilterableFields } from './doctorSchedule.constants'

const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const result = await DoctorScheduleService.createDoctorScheduleIntoDb(
      user,
      req.body
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Doctor Schedule created successfully!',
      data: result,
    })
  }
)

const getMySchedule = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate', 'isBooked'])
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const user = req.user
    const result = await DoctorScheduleService.getMyScheduleFromDb(
      filters,
      options,
      user as TAuthUser
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'My Schedule fetched successfully!',
      data: result,
    })
  }
)

const deleteDoctorSchedule = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { id } = req.params

    const result = await DoctorScheduleService.deleteDoctorScheduleFromDB(
      user as TAuthUser,
      id
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'My Schedule deleted successfully!',
      data: result,
    })
  }
)

const getAllDoctorSchedules = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, scheduleFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await DoctorScheduleService.getAllDoctorScheduleFromDB(
      filters,
      options
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Doctor Schedule retrieval successfully',
      meta: result.meta,
      data: result.data,
    })
  }
)

export const DoctorScheduleController = {
  createDoctorSchedule,
  getMySchedule,
  deleteDoctorSchedule,
  getAllDoctorSchedules,
}
