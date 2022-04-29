import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

type UserDetails = {
  username: string
  password: string
}

const createUserFn = (userDetails: UserDetails) => {
  const { username, password } = userDetails
  return ctx.client.request(
    gql`
      mutation ($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
          userType
          username
          password
        }
      }
    `,
    {
      username,
      password,
    },
  )
}

it('creates a user', async () => {
  const createUser = await createUserFn({
    username: 'user1',
    password: 'password1',
  })

  expect(createUser).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "password": "password1",
        "userType": "USER",
        "username": "user1",
      },
    }
  `)
})

it('queries all all the users', async () => {
  await createUserFn({
    username: 'user1',
    password: 'password1',
  })

  await createUserFn({
    username: 'user2',
    password: 'password2',
  })

  const allUsers = await ctx.client.request(
    `
    {
      users {
        userType,
        username, 
        password
      }
    }
    `,
  )

  expect(allUsers).toMatchInlineSnapshot(`
    Object {
      "users": Array [
        Object {
          "password": "password1",
          "userType": "USER",
          "username": "user1",
        },
        Object {
          "password": "password2",
          "userType": "USER",
          "username": "user2",
        },
      ],
    }
  `)
})

afterEach(async () => {
  const deleteUsers = prisma.user.deleteMany()
  await prisma.$transaction([deleteUsers])
})
