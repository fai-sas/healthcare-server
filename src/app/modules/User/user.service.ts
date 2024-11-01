import { PrismaClient, UserRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const createAdminIntoDb = async (data: any) => {
  return console.log('create admin')
}

export const userService = {
  createAdminIntoDb,
}
