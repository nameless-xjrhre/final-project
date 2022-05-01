import { Context } from '../../context'

type CreateUser = {
  username: string
  password: string
}

export async function createUser(user: CreateUser, ctx: Context) {
  // if username is less than 3 characters, throw error
  if (user.username.length < 3) {
    return new Error('Username must be at least 3 characters long')
  }
  // if password is less than 6 characters, throw error
  // password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character
  if (user.password.length < 6) {
    return new Error('Password must be at least 6 characters long')
  }

  return ctx.prisma.user.create({
    data: {
      ...user,
      username: 'math',
    },
  })
}
