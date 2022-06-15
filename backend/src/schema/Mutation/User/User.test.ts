import { User } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createUser, updateUserType, validateCreateUser } from './User.resolver'

let mockCtx: MockContext
let ctx: Context

type CreateUser = {
  username: string
  password: string
}

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create a user', async () => {
  const user: User = {
    id: 1,
    username: 'Username1',
    password: 'Password1',
    userType: 'USER',
  }

  mockCtx.prisma.user.create.mockResolvedValue(user)

  const input = {
    username: 'Username1',
    password: 'Password1',
  }

  await expect(createUser(input, ctx)).resolves.toEqual(user)

  expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
    data: {
      username: 'Username1',
      password: 'Password1',
    },
  })
})

test('should update user type to admin', async () => {
  // first create a user
  const user: User = {
    id: 1,
    username: 'username',
    password: 'password',
    userType: 'USER',
  }

  mockCtx.prisma.user.create.mockResolvedValue(user)

  mockCtx.prisma.user.update.mockResolvedValue({
    ...user,
    userType: 'ADMIN',
  })

  await expect(updateUserType(1, 'ADMIN', ctx)).resolves.toEqual({
    id: 1,
    username: 'username',
    password: 'password',
    userType: 'ADMIN',
  })

  expect(mockCtx.prisma.user.update).toHaveBeenCalledWith({
    where: {
      id: 1,
    },

    data: {
      userType: 'ADMIN',
    },
  })
})

it('should test the validate create user', async () => {
  const user: CreateUser = {
    username: 'Username1',
    password: 'Password1',
  }

  // no same username found
  mockCtx.prisma.user.findFirst.mockResolvedValue(null)

  const result = await validateCreateUser(user, ctx)

  expect(result).toBeUndefined()

  expect(mockCtx.prisma.user.findFirst).toHaveBeenCalledWith({
    where: {
      username: 'Username1',
    },
  })
})

it('should return password error for validation', async () => {
  const user: CreateUser = {
    username: 'Username1',
    password: 'password',
  }

  await expect(validateCreateUser(user, ctx)).rejects.toThrow(
    'Password must have capital letter, a number, and be at least 8 characters long',
  )
})

test('if username is found', async () => {
  const user: CreateUser = {
    username: 'Username1',
    password: 'Password1',
  }

  mockCtx.prisma.user.findFirst.mockResolvedValue({
    id: 1,
    password: 'Password1',
    username: 'Username1',
    userType: 'USER',
  })

  await expect(validateCreateUser(user, ctx)).rejects.toThrow(
    'Username is already taken',
  )

  expect(mockCtx.prisma.user.findFirst).toHaveBeenCalledWith({
    where: {
      username: 'Username1',
    },
  })
})
