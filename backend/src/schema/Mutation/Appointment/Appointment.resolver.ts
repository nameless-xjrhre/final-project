import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type CreateAppointmentType = NexusGenInputs['CreateAppointmentInput']

export type CreatePatientType = NexusGenInputs['CreatePatientInput']

export function createAppointment(
  appointment: CreateAppointmentType,
  medStaffId: number,
  patientId: number,
  ctx: Context,
) {
  return ctx.prisma.appointment.create({
    data: {
      visitType: appointment.visitType,
      date: appointment.date,
      status: appointment.status,
      medStaffId,
      patientId,
    },
  })
}

export async function createAppointmentWithPatient(
  appointment: CreateAppointmentType,
  patient: CreatePatientType,
  medStaffId: number,
  ctx: Context,
) {
  const newPatient = await ctx.prisma.patient.create({
    data: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      sex: patient.sex,
      dateOfBirth: patient.dateOfBirth,
      contactNum: patient.contactNum,
      address: patient.address,
    },
  })

  return ctx.prisma.appointment.create({
    data: {
      visitType: appointment.visitType,
      date: appointment.date,
      status: appointment.status,
      medStaffId,
      patientId: newPatient.id,
    },
  })
}
