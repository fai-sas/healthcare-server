import { Prisma } from '@prisma/client'
import { paginationHelper } from '../../../utils/pagination'
import { adminSearchAbleFields } from './admin.constant'
import prisma from '../../../utils/prisma'

const getAllFromDB = async (params: any, options: any) => {
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
          equals: filterData[key],
        },
      })),
    })
  }

  //console.dir(andConditions, { depth: 'infinity' })
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }

  const result = await prisma.admin.findMany({
    where: whereConditions,
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
  return result
}

export const AdminService = {
  getAllFromDB,
}
