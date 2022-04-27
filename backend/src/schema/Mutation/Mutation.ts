import { objectType, stringArg } from 'nexus'

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
  },
})

export default Mutation
