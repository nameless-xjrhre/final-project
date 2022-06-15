import { Context } from '../../../context'

export async function queryPatientById(ctx: Context, id: number) {
  return ctx.prisma.patient.findFirst({
    where: {
      id,
    },
  })
}

export async function validatePatientById(ctx: Context, id: number) {
  const patient = await ctx.prisma.patient.findFirst({
    where: {
      id,
    },
  })
  if (!patient) {
    throw new Error('Patient not found')
  }
}
