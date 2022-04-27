import { context } from '../context'
import { createTestContext } from './__helpers'

const { prisma } = context

const ctx = createTestContext()
it('creates a user', async () => {
  await ctx.client.request(
    `
      mutation($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
          id,
          userType,
          username, 
          password
        }
      }
    `,
    {
      username: 'user1',
      password: 'password1',
    },
  )

  const user = await prisma.user.findFirst({
    where: {
      username: 'user1',
    },
  })

  expect(user).toBeDefined()
})

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany()
  await prisma.$transaction([deleteUsers])
})
