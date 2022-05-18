/* eslint-disable no-console */
import { PrismaClient, ScheduleStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomScheduleStatus() {
  const scheduleTypes = Object.values(ScheduleStatus)
  return scheduleTypes[Math.floor(Math.random() * scheduleTypes.length)]
}

function getDateOfLastMonday(currentDate: Date) {
  const today = currentDate
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(today.setDate(diff))
  return new Date(monday.setHours(0, 0, 0, 0))
}

function getDateOfNextSunday(currentDate: Date) {
  const today = currentDate
  const day = today.getDay()
  const diff = today.getDate() + (7 - day)
  const sunday = new Date(today.setDate(diff))
  return new Date(sunday.setHours(23, 59, 59, 0))
}

function randomDateBetween(startDate: Date, endDate: Date) {
  const start = startDate.getTime()
  const end = endDate.getTime()
  return new Date(start + Math.random() * (end - start))
}

async function seedMedicalStaff() {
  console.log(`Seed 10 medical staff ...`)
  for (let i = 0; i < 10; i += 1) {
    const startTime = randomDateBetween(
      getDateOfLastMonday(new Date()),
      getDateOfNextSunday(new Date()),
    )

    const endTime = new Date(
      startTime.getTime() + Math.random() * (3 * 60 * 60 * 1000),
    )

    await prisma.medicalStaff.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        contactNum: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        schedules: {
          create: {
            endTime,
            startTime,
            status: randomScheduleStatus(),
          },
        },
      },
    })
  }
  console.log(`Medical staff seeding finished.`)
}

export default seedMedicalStaff
