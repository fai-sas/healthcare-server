import express, { NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { UserRole } from '@prisma/client'
import { imageUploader } from '../../utils/imageUploader'
import { userValidation } from './user.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-admin',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  imageUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req, res, next)
  }
)

export const userRoutes = router
