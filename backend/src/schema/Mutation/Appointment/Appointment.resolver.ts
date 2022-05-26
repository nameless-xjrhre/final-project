import _ from 'lodash'
import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type CreateAppointmentType = NexusGenInputs['CreateAppointmentInput']
export type CreatePatientType = NexusGenInputs['CreatePatientInput']
export type EditAppointmentType = NexusGenInputs['EditAppointmentInput']

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
      note: appointment.note,
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
      note: appointment.note,
      status: appointment.status,
      medStaffId,
      patientId: newPatient.id,
    },
  })
}

export async function editAppointment(
  id: number,
  appointment: EditAppointmentType,
  ctx: Context,
) {
  const data = _.pickBy(
    {
      visitType: appointment.visitType,
      date: appointment.date,
      note: appointment.note,
      status: appointment.status,
    },
    _.identity,
  )

  return ctx.prisma.appointment.update({
    where: {
      id,
    },
    data,
  })
}

export async function deleteAppointment(id: number, ctx: Context) {
  return ctx.prisma.appointment.delete({
    where: {
      id,
    },
  })
}
