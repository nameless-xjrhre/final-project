import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

it('should create a new medical staff', async () => {
  const medStaff = await ctx.client.request(gql`
    mutation {
      createMedicalStaff(
        data: {
          firstName: "Jose"
          lastName: "Rizal"
          contactNum: "09324852919"
          address: "Makati"
        }
      ) {
        fullName
        contactNum
        address
      }
    }
  `)

  expect(medStaff).toMatchInlineSnapshot(`
    Object {
      "createMedicalStaff": Object {
        "address": "Makati",
        "contactNum": "09324852919",
        "fullName": "Jose Rizal",
      },
    }
  `)
})

afterEach(async () => {
  await prisma.schedule.deleteMany()
  await prisma.medicalStaff.deleteMany()
})
