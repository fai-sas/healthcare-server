import { Request } from 'express'
import { TFile } from '../../interfaces/file'
import { imageUploader } from '../../utils/imageUploader'
import prisma from '../../utils/prisma'
import { Specialties } from '@prisma/client'

const createSpecialtiesIntoDb = async (req: Request) => {
  const file = req.file as TFile

  if (file) {
    const uploadToCloudinary = await imageUploader.uploadToCloudinary(file)
    req.body.icon = uploadToCloudinary?.secure_url
  }

  const result = await prisma.specialties.create({
    data: req.body,
  })

  return result
}

const getAllSpecialtiesFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany()
}

const deleteSpecialtiesFromDB = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  })
  return result
}

export const SpecialtiesService = {
  createSpecialtiesIntoDb,
  getAllSpecialtiesFromDB,
  deleteSpecialtiesFromDB,
}
