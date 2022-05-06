import { UserType, User } from '@prisma/client'
import { Context } from '../../context'

type CreateUser = {
  username: string
  password: string
}

export async function createUser(
  user: CreateUser,
  ctx: Context,
): Promise<User> {
  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  })
}

export async function updateUserType(
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
