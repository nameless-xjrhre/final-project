import { queryField, intArg, nonNull } from 'nexus'

const QueryPatientById = queryField('patient', {
  type: 'Patient',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.patient.findFirst({
      where: {
        id: args.id,
      },
    }),
  validate: async (parent, args, context) => {
    // check if patient exists
    const patient = await context.prisma.patient.findFirst({
      where: {
        id: args.id,
      },
    })
    if (!patient) {
      throw new Error('Patient not found')
    }
  },
})

export default [QueryPatientById]
