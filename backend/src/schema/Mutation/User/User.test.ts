import { User } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createUser, updateUserType } from './User.resolver'

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
