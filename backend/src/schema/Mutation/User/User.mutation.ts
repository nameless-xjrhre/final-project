import { mutationField, arg, nonNull } from 'nexus'
import { createUser } from './User.resolver'

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'CreateUserInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createUser(args.data, context),
  validate: async (rules, args, context) => {
    // Password must have capital letter, a number, and be at least 8 characters long
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(args.data.password)) {
      throw new Error(
        'Password must have capital letter, a number, and be at least 8 characters long',
      )
    }
    // throw error if username is already taken
    const user = await context.prisma.user.findFirst({
      where: {
        username: args.data.username,
      },
    })
    if (user) {
      throw new Error('Username is already taken')
    }
  },
})
