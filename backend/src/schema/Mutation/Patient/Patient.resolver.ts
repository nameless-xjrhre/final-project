import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type PatientInputType = NexusGenInputs['CreatePatientInput']

export type EditPatientType = NexusGenInputs['EditPatientInput']

export function createPatient(patient: PatientInputType, ctx: Context) {
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
  patient: EditPatientType,
  ctx: Context,
) {
  return ctx.prisma.patient.update({
    where: {
      id: patientId,
    },
    data: {
      address: patient.address ?? undefined,
      contactNum: patient.contactNum ?? undefined,
      firstName: patient.firstName ?? undefined,
      lastName: patient.lastName ?? undefined,
      sex: patient.sex ?? undefined,
      dateOfBirth: patient.dateOfBirth ?? undefined,
    },
  })
}

export async function deletePatient(patientId: number, ctx: Context) {
  return ctx.prisma.patient.delete({
    where: {
      id: patientId,
    },
    include: {
      appointments: true,
      hospitalBills: true,
      medicalRecords: true,
    },
  })
}
