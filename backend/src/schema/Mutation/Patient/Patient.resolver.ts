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
