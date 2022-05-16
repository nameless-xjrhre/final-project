import { Sex } from '@prisma/client'
import { Context } from '../../../context'

export type InputPatient = {
  firstName: string
  lastName: string
  sex: Sex
  dateOfBirth: Date
  contactNum: string
  address: string
}

export type EditPatient = Partial<InputPatient>

export function createPatient(patient: InputPatient, ctx: Context) {
  return ctx.prisma.patient.create({
    data: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      sex: patient.sex,
      dateOfBirth: patient.dateOfBirth,
      contactNum: patient.contactNum,
      address: patient.address,
    },
  })
}

export async function editPatient(
  patientId: number,
  patient: EditPatient,
  ctx: Context,
) {
  if (Object.keys(patient).length === 0) {
    throw new Error('No data provided')
  }
  return ctx.prisma.patient.update({
    where: {
      id: patientId,
    },
    data: { ...patient, id: patientId },
  })
}
