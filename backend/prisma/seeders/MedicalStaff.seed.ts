import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seedMedicalStaff() {
  console.log(`Seed 10 medical staff ...`)
  for (let i = 0; i < 10; i += 1) {
    const startTime = faker.date.future()
    const endTime = new Date(startTime.getTime() + 1000 * 60 * 60)

    await prisma.medicalStaff.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        contactNum: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        Schedule: {
          create: {
            endTime,
            startTime,
          },
        },
      },
    })
  }
  console.log(`Medical staff seeding finished.`)
}

export default seedMedicalStaff
