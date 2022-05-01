import { User } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../context'
import { createUser, updateUserType } from './resolvers'

let mockCtx: MockContext
let ctx: Context

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
})

test('shold fail if username is less than 3 characters or if password is less than 6', async () => {
  const user: User = {
    id: 1,
    username: 'us',
    password: 'password',
    userType: 'USER',
  }

  mockCtx.prisma.user.create.mockResolvedValue(user)

  const input = {
    username: 'us',
    password: 'password',
  }

  await expect(createUser(input, ctx)).rejects.toThrow(
    'at least 6 characters,at least one capital letter,at least one capital letter,at least one number',
  )

  const input2 = {
    username: 'username',
    password: 'pass',
  }

  await expect(createUser(input2, ctx)).rejects.toThrow(
    'at least one capital letter,at least 6 characters,at least one capital letter,at least one number',
  )
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
})
