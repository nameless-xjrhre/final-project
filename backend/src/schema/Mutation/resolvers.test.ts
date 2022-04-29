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

  await expect(createUser(user, ctx)).resolves.toEqual({
    id: 1,
    username: 'username',
    password: 'password',
    userType: 'USER',
  })
})
