import { objectType } from 'nexus'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context) => context.prisma.user.findMany(),
    })
    t.nonNull.list.nonNull.field('patients', {
      type: 'Patient',
      resolve: (_parent, _args, context) => context.prisma.patient.findMany(),
    })
    t.nonNull.list.nonNull.field('medicalStaff', {
      type: 'MedicalStaff',
      resolve: (_parent, _args, context) =>
        context.prisma.medicalStaff.findMany(),
    })
  },
})

export default Query
