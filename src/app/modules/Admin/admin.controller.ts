import { Request, RequestHandler, Response } from 'express'
import { AdminService } from './admin.service'
import { adminFilterableFields } from './admin.constant'
import pick from '../../utils/pick'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getAllAdminsFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    const result = await AdminService.getAllAdminsFromDB(filters, options)

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Admin data fetched!',
      meta: result.meta,
      data: result.data,
    })
  }
)

export const AdminController = {
  getAllAdminsFromDB,
}
