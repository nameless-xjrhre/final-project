import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

beforeEach(async () => {
  // create a new medical staff
  await ctx.client.request(gql`
    mutation {
      createMedicalStaff(
        data: {
          firstName: "Jose"
          lastName: "Rizal"
          contactNum: "09324852919"
          address: "Makati"
        }
      ) {
        id
        fullName
      }
    }
  `)
})

it('should create an appointment with new patient', async () => {
  const medStaffId = await prisma.medicalStaff
    .findMany()
    .then((staff) => staff[0].id)

  const createSchedule = await ctx.client.request(
    gql`
      mutation ($medStaffId: Int!) {
        createSchedule(
          data: {
            startTime: "2022-05-27T07:38:00Z"
            endTime: "2022-05-27T08:38:00Z"
            status: CLOSED
            medStaffId: $medStaffId
          }
        ) {
          startTime
          endTime
          status
          medStaff {
            fullName
          }
        }
      }
    `,
    {
      medStaffId,
    },
  )

  expect(createSchedule).toMatchInlineSnapshot(`
    Object {
      "createSchedule": Object {
        "endTime": "2022-05-27T08:38:00.000Z",
        "medStaff": Object {
          "fullName": "Jose Rizal",
        },
        "startTime": "2022-05-27T07:38:00.000Z",
        "status": "CLOSED",
      },
    }
  `)
})

afterEach(async () => {
  await prisma.schedule.deleteMany()
  await prisma.medicalStaff.deleteMany()
})
