import {
  makeSchema,
  objectType,
  asNexusMethod,
  enumType,
  stringArg,
} from 'nexus'

import * as gqlTypes from 'nexus-prisma'

import { DateTimeResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context) => context.prisma.user.findMany(),
    })
  },
})

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

const UserType = enumType(gqlTypes.UserType)

const User = objectType({
  name: 'User',
  definition(t) {
    t.field(gqlTypes.User.id)
    t.field('userType', {
      type: UserType,
    })
    t.field(gqlTypes.User.username)
    t.field(gqlTypes.User.password)
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User],
  outputs: {
    schema: `${__dirname}/../schema.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
