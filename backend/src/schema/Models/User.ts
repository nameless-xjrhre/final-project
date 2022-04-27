import { objectType, enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

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

export default User
