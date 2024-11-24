import { Doctor, Prisma, UserStatus } from '@prisma/client'
import { TPaginationOptions } from '../../interfaces/pagination'
import { paginationHelper } from '../../utils/pagination'
import prisma from '../../utils/prisma'
import { TDoctorFilterRequest } from './doctor.interface'
import { doctorSearchableFields } from './doctor.constants'
