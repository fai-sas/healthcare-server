import { UserRole } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import { SpecialtiesController } from './specialties.controller'
import auth from '../../middlewares/auth'
import { imageUploader } from '../../utils/imageUploader'
import { SpecialtiesValidation } from './specialties.validation'

const router = express.Router()

router.get('/', SpecialtiesController.getAllSpecialties)

router.post(
  '/',
  imageUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data))
    return SpecialtiesController.createSpecialties(req, res, next)
  }
)

router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialtiesController.deleteSpecialties
)

export const SpecialtiesRoutes = router
