import express, { NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { UserRole } from '@prisma/client'
import { imageUploader } from '../../utils/imageUploader'
import { userValidation } from './user.validation'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'

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

router.post(
  '/create-doctor',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  imageUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
    return userController.createDoctor(req, res, next)
  }
)

router.post(
  '/create-patient',
  imageUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatient.parse(JSON.parse(req.body.data))
    return userController.createPatient(req, res, next)
  }
)

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUsers
)

router.get(
  '/my-profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userController.getMyProfile
)

router.patch(
  '/update-my-profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  imageUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    return userController.updateMyProfile(req, res, next)
  }
)

router.patch(
  '/:id/status',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidation.updateStatus),
  userController.changeProfileStatus
)

export const userRoutes = router
