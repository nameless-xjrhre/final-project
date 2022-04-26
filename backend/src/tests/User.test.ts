import { createTestContext } from './__helpers'

const ctx = createTestContext()
it('creates a user', async () => {
  const createUser = await ctx.client.request(
    `
      mutation {
        createUser(username: $username, password: $password) {
          id,
          userType,
          username, 
          password
        }
      }
    `,
    {
      username: 'testname',
      password: 'testpassword',
    },
  )

  expect(createUser).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "id": "1",
        "password": "testpassword",
        "userType": "USER",
        "username": "testname",
      },
    }
  `)
})
