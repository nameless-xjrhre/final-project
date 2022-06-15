import { queryField, intArg, nonNull } from 'nexus'
import { queryPatientById, validatePatientById } from './Patient.resolver'

const QueryPatientById = queryField('patient', {
  type: 'Patient',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => queryPatientById(context, args.id),
  validate: async (parent, args, context) =>
    validatePatientById(context, args.id),
})

// get total number of patients
const QueryPatientTotal = queryField('totalPatients', {
  type: 'Int',
  resolve: (_parent, _args, context) => context.prisma.patient.count(),
})

export default [QueryPatientById, QueryPatientTotal]
