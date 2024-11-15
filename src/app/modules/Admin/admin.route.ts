import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.get('/', AdminController.getAllAdmins)

router.get('/:id', AdminController.getSingleAdmin)

router.patch('/:id', AdminController.updateAdmin)

export const AdminRoutes = router
