import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { DoctorRoutes } from '../modules/Doctor/doctor.routes'
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/specialties',
    route: SpecialtiesRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
