import { makeSchema, asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { validatePlugin } from 'nexus-validate'
import InputTypes from './Inputs'
import Query from './Query'
import Mutation from './Mutation'
import Models from './Models'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [Query, Mutation, DateTime, ...Models, ...InputTypes],
  outputs: {
    schema: `${__dirname}/../../schema.graphql`,
    typegen: `${__dirname}/../generated/nexus.ts`,
  },
  contextType: {
    module: require.resolve('../context'),
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
  plugins: [validatePlugin()],
})
