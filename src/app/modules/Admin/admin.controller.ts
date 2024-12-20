import { Request, RequestHandler, Response } from 'express'
import { AdminService } from './admin.service'
import { adminFilterableFields } from './admin.constant'
import pick from '../../utils/pick'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getAllAdmins: RequestHandler = catchAsync(
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

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AdminService.getSingleAdminFromDB(id)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin data fetched by id!',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AdminService.updateAdminIntoDB(id, req.body)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin data updated!',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AdminService.deleteAdminFromDB(id)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin data deleted!',
    data: result,
  })
})

const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AdminService.softDeleteAdminFromDB(id)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin data deleted!',
    data: result,
  })
})

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
}
