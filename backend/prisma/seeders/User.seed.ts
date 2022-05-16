/* eslint-disable no-console */
import { PrismaClient, UserType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomUserType() {
  const userTypes = Object.values(UserType)
  return userTypes[Math.floor(Math.random() * userTypes.length)]
}

async function seedUsers() {
  console.log(`Seed 10 users ...`)
  for (let i = 0; i < 10; i += 1) {
    await prisma.user.create({
      data: {
        userType: randomUserType(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    })
  }
  console.log(`User seeding finished.`)
}

export default seedUsers
