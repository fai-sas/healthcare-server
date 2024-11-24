import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { DoctorScheduleController } from './doctorSchedule.controller'
import validateRequest from '../../middlewares/validateRequest'
import { DoctorScheduleValidation } from './doctorSchedule.validation'

const router = express.Router()

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  DoctorScheduleController.getAllDoctorSchedules
)

router.get(
  '/my-schedule',
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
)

router.post(
  '/',
  auth(UserRole.DOCTOR),
  validateRequest(DoctorScheduleValidation.create),
  DoctorScheduleController.createDoctorSchedule
)

router.delete(
  '/:id',
  auth(UserRole.DOCTOR),
  DoctorScheduleController.deleteDoctorSchedule
)

export const DoctorScheduleRoutes = router
