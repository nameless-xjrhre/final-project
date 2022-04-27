import { objectType, stringArg, nonNull, arg } from 'nexus'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        username: stringArg(),
        password: stringArg(),
      },
      resolve: (_parent, args, context) =>
        context.prisma.user.create({
          data: {
            username: args.username || '',
            password: args.password || '',
          },
        }),
    })
    t.nonNull.field('createPatient', {
      type: 'Patient',
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        sex: nonNull(arg({ type: 'Sex' })),
        dateOfBirth: nonNull(
          arg({
            type: 'DateTime',
          }),
        ),
        contactNum: stringArg(),
        address: stringArg(),
      },
      resolve: (_parent, args, context) =>
        context.prisma.patient.create({
          data: {
            firstName: args.firstName || '',
            lastName: args.lastName || '',
            sex: args.sex,
            dateOfBirth: args.dateOfBirth || '',
            contactNum: args.contactNum || '',
            address: args.address || '',
          },
        }),
    })
  },
})

export default Mutation
