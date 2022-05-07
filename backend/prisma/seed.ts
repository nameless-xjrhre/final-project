/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import {
  seedUsers,
  seedMedicalStaff,
  seedPatients,
  seedPatientInfo,
  seedAppointments,
} from './seeders'

const prisma = new PrismaClient()

async function main() {
  await seedUsers()
  await seedPatients()
  await seedMedicalStaff()
  await seedPatientInfo()
  await seedAppointments()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
