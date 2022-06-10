import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type CreateMedicalRecordInputType =
  NexusGenInputs['CreateMedicalRecordInput']

export async function createMedicalRecord(
  medicalRecord: CreateMedicalRecordInputType,
  ctx: Context,
) {
  return ctx.prisma.medicalRecord.create({
    data: {
      patientId: medicalRecord.patientId,
      medStaffId: medicalRecord.medStaffId,
      date: medicalRecord.date,
      diagnosis: medicalRecord.diagnosis,
      prescription: medicalRecord.prescription,
    },
  })
}
