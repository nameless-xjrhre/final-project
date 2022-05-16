import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type CreateAppointmentType = NexusGenInputs['CreateAppointmentInput']
export type CreatePatientType = NexusGenInputs['CreatePatientInput']
export type CreateAppointmentBillType =
  NexusGenInputs['CreateHospitalBillInput']

export function createAppointment(
  appointment: CreateAppointmentType,
  medStaffId: number,
  patientId: number,
  hospitalBillId: number,
  ctx: Context,
) {
  return ctx.prisma.appointment.create({
    data: {
      visitType: appointment.visitType,
      date: appointment.date,
      status: appointment.status,
      medStaffId,
      patientId,
      hospitalBillId,
    },
  })
}

export async function createAppointmentWithPatient(
  appointment: CreateAppointmentType,
  patient: CreatePatientType,
  hospitalBill: CreateAppointmentBillType,
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

  const newBill = await ctx.prisma.hospitalBill.create({
    data: {
      patientId: newPatient.id,
      amount: hospitalBill.amount,
      status: hospitalBill.status,
      date: hospitalBill.date,
    },
  })

  return ctx.prisma.appointment.create({
    data: {
      visitType: appointment.visitType,
      date: appointment.date,
      status: appointment.status,
      medStaffId,
      patientId: newPatient.id,
      hospitalBillId: newBill.id,
    },
  })
}
