import { Context } from '../../context'

type CreatUser = {
  username: string
  password: string
}

export async function createUser(user: CreatUser, context: Context) {
  return context.prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  })
}
