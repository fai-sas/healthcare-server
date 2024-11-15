import { Admin, Prisma } from '@prisma/client'
import { paginationHelper } from '../../utils/pagination'
import { adminSearchAbleFields } from './admin.constant'
import prisma from '../../utils/prisma'
import { TAdminFilterRequest } from './admin.interface'
import { TPaginationOptions } from '../../interfaces/pagination'

const getAllAdminsFromDB = async (
  params: TAdminFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options)
  const { searchTerm, ...filterData } = params

  const andConditions: Prisma.AdminWhereInput[] = []

  //console.log(filterData);
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  andConditions.push({
    isDeleted: false,
  })

  //console.dir(andConditions, { depth: 'infinity' })
  const whereCondition: Prisma.AdminWhereInput = { AND: andConditions }

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })

  const total = await prisma.admin.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AdminService = {
  getAllAdminsFromDB,
}
