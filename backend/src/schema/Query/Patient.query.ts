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

// get total number of patients
const QueryPatientTotal = queryField('totalPatients', {
  type: 'Int',
  resolve: (_parent, _args, context) => context.prisma.patient.count(),
})

export default [QueryPatientById, QueryPatientTotal]
