import { objectType, stringArg, nonNull, arg } from 'nexus'
import { createUser } from './resolvers'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: (_parent, args, context) =>
        createUser(
          {
            username: args.username,
            password: args.password,
          },
          context,
        ),
      validate: async (rules, args, context) => {
        // Password must have capital letter, a number, and be at least 8 characters long
        if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(args.password)) {
          throw new Error(
            'Password must have capital letter, a number, and be at least 8 characters long',
          )
        }
        // throw error if username is already taken
        const user = await context.prisma.user.findFirst({
          where: {
            username: args.username,
          },
        })
        if (user) {
          throw new Error('Username is already taken')
        }
      },
    })
    t.nonNull.field('createPatient', {
      type: 'Patient',
      args: {
        data: nonNull(
          arg({
            type: 'CreatePatientInput',
          }),
        ),
      },
      resolve: (_parent, args, context) =>
        context.prisma.patient.create({
          data: {
            firstName: args.data.firstName,
            lastName: args.data.lastName,
            sex: args.data.sex,
            dateOfBirth: args.data.dateOfBirth,
            contactNum: args.data.contactNum,
            address: args.data.address,
          },
        }),
    })
  },
})

export default Mutation
