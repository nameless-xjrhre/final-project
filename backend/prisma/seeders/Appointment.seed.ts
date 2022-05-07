import { PrismaClient, VisitType, AppointmentStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomVisitType() {
  const visitTypes = Object.values(VisitType)
  return visitTypes[Math.floor(Math.random() * visitTypes.length)]
}

function randomAppointmentStatus() {
  const appointmentStatuses = Object.values(AppointmentStatus)
  return appointmentStatuses[
    Math.floor(Math.random() * appointmentStatuses.length)
  ]
}

async function seedAppointments() {
  console.log(`Seed 10 appointments ...`)
  for (let i = 0; i < 10; i += 1) {
    await prisma.appointment.create({
      data: {
        date: faker.date.future(),
        visitType: randomVisitType(),
        status: randomAppointmentStatus(),
        medStaffId: i + 1,
        patientId: i + 1,
      },
    })
  }
  console.log(`Appointment seeding finished.`)
}

export default seedAppointments
