import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { ScheduleController } from './schedule.controller'

const router = express.Router()

router.get('/', auth(UserRole.DOCTOR), ScheduleController.getAllSchedules)

router.get(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getSingleSchedule
)

router.post(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.createSchedule
)

router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.deleteSchedule
)

export const ScheduleRoutes = router
