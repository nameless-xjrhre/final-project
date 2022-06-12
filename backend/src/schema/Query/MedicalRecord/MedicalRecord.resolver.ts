import { Context } from '../../../context'

export async function getMedicalRecordByPatientId(
  ctx: Context,
  args: { id: number },
) {
  return ctx.prisma.medicalRecord.findMany({
    where: {
      patientId: args.id,
    },
  })
}

export async function validateMedicalRecord(
  ctx: Context,
  args: { id: number },
) {
  const patient = await ctx.prisma.patient.findFirst({
    where: {
      id: args.id,
    },
  })
  if (!patient) {
    throw new Error('Patient not found')
  }
}
