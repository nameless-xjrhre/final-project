/* eslint-disable no-console */
import { PrismaClient, Sex } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomSexType() {
  const sexTypes = Object.values(Sex)
  return sexTypes[Math.floor(Math.random() * sexTypes.length)]
}

async function seedPatients() {
  console.log(`Seed 10 patients ...`)
  for (let i = 0; i < 10; i += 1) {
    await prisma.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: randomSexType(),
        dateOfBirth: faker.date.past(),
        contactNum: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
      },
    })
  }
  console.log(`Patient seeding finished.`)
}

export default seedPatients
