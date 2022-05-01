import { User } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../context'
import { createUser } from './resolvers'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create a user', async () => {
  const user: User = {
    id: 1,
    username: 'username',
    password: 'password',
    userType: 'USER',
  }

  mockCtx.prisma.user.create.mockResolvedValue(user)

  const input = {
    username: 'username',
    password: 'password',
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

  await expect(createUser(input, ctx)).resolves.toEqual(
    new Error('Username must be at least 3 characters long'),
  )

  const input2 = {
    username: 'username',
    password: 'pass',
  }

  await expect(createUser(input2, ctx)).resolves.toEqual(
    new Error('Password must be at least 6 characters long'),
  )
})
