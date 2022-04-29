import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

beforeEach(async () => {
  await ctx.client.request(gql`
    mutation {
      createPatient(
        firstName: "Hans"
        lastName: "Daduya"
        sex: MALE
        dateOfBirth: "2022-04-27T07:38:00Z"
        contactNum: "1234567890"
        address: "Jaro"
      ) {
        firstName
        lastName
        dateOfBirth
      }
    }
  `)
})

it('should query all patients', async () => {
  const allPatients = await ctx.client.request(
    `
    {
      patients {
        firstName
        lastName
        dateOfBirth
      }
    }
    `,
  )

  expect(allPatients).toMatchInlineSnapshot(`
    Object {
      "patients": Array [
        Object {
          "dateOfBirth": "2022-04-27T07:38:00.000Z",
          "firstName": "Hans",
          "lastName": "Daduya",
        },
      ],
    }
  `)
})

afterEach(async () => {
  const deletePatients = prisma.patient.deleteMany()
  await prisma.$transaction([deletePatients])
})
