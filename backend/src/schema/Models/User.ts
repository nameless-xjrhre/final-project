import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { UserType } from '../Enums'

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

export default User
