import { UserType, User } from '@prisma/client'
import { fold, getApplicativeValidation } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { sequenceS } from 'fp-ts/lib/Apply'
import { getSemigroup, NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { validatePassword, validateUsername } from './utils'
import { Context } from '../../context'
import { CustomError } from '../../errors'

type CreateUser = {
  username: string
  password: string
}

export async function createUser(
  user: CreateUser,
  ctx: Context,
): Promise<User> {
  return pipe(
    user,
    ({ username, password }) =>
      sequenceS(getApplicativeValidation(getSemigroup<string>()))({
        username: validateUsername(username),
        password: validatePassword(password),
      }),
    fold(
      (errors: NonEmptyArray<string>) => {
        throw CustomError.of(errors)
      },
      async (validUser: CreateUser) =>
        ctx.prisma.user.create({
          data: {
            username: validUser.username,
            password: validUser.password,
            userType: UserType.USER,
          },
        }),
    ),
  )
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
