import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.field(gqlTypes.User.username)
    t.field(gqlTypes.User.password)
  },
})

export default [CreateUserInput]
