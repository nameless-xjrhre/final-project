import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()
it('creates a user', async () => {
  const createUser = await ctx.client.request(
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

  expect(createUser).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "id": 1,
        "password": "password1",
        "userType": "USER",
        "username": "user1",
      },
    }
  `)
})

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany()
  await prisma.$transaction([deleteUsers])
})
