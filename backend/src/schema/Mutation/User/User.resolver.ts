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

export async function validateCreateUser(user: CreateUser, ctx: Context) {
  // Password must have capital letter, a number, and be at least 8 characters long
  if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(user.password)) {
    throw new Error(
      'Password must have capital letter, a number, and be at least 8 characters long',
    )
  }
  // throw error if username is already taken
  const searchedUser = await ctx.prisma.user.findFirst({
    where: {
      username: user.username,
    },
  })
  if (searchedUser) {
    throw new Error('Username is already taken')
  }
}
