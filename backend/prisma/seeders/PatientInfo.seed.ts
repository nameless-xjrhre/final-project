/* eslint-disable no-console */
import { PrismaClient, BillStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomBillStatus() {
  const billStatuses = Object.values(BillStatus)
  return billStatuses[Math.floor(Math.random() * billStatuses.length)]
}

async function seedPatientInfo() {
  console.log(`Seed 10 patient info ...`)
  for (let i = 0; i < 10; i += 1) {
    await prisma.medicalRecord.create({
      data: {
        patientId: i + 1,
        medStaffId: i + 1,
        date: faker.date.future(),
        diagnosis: faker.lorem.sentence(),
        prescription: faker.lorem.sentence(),
      },
    })
    const startDate = faker.date.future()
    const deadlineDate = new Date(
      startDate.getTime() + Math.random() * (1000 * 60 * 60 * 24 * 30),
    )
    await prisma.hospitalBill.create({
      data: {
        patientId: i + 1,
        date: startDate,
        deadlineDate,
        medStaffId: 1,
        amount: +faker.commerce.price(),
        status: randomBillStatus(),
      },
    })
  }
  console.log(`Patient info seeding finished.`)
}

export default seedPatientInfo
