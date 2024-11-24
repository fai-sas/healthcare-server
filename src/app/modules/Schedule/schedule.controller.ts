import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ScheduleService } from './schedule.sevice'
import { TAuthUser } from '../../interfaces/common'
import pick from '../../utils/pick'

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createScheduleIntoDb(req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Schedule created successfully!',
    data: result,
  })
})

const getAllSchedules = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate'])
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const user = req.user

    const result = await ScheduleService.getAllSchedulesFromDb(
      filters,
      options,
      user as TAuthUser
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Schedule fetched successfully!',
      data: result,
    })
  }
)

const getSingleSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ScheduleService.getSingleScheduleFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Schedule retrieval successfully',
    data: result,
  })
})

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ScheduleService.deleteScheduleFromDb(id)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Schedule deleted successfully',
    data: result,
  })
})

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  deleteSchedule,
}
