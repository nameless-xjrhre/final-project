import { UserType } from '@prisma/client'
import { Context } from '../../../context'

type CreateUser = {
  username: string
  password: string
}

export function createUser(user: CreateUser, ctx: Context) {
  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  })
}

export function updateUserType(
  userId: number,
  userType: UserType,
  ctx: Context,
) {
  return ctx.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userType,
    },
  })
}
