import { PrismaClient } from '@prisma/client'
import { seedUsers, seedMedicalStaff } from './seeders'

const prisma = new PrismaClient()

async function main() {
  Promise.all([seedUsers(), seedMedicalStaff()])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
