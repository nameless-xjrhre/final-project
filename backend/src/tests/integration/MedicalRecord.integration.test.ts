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

  // create a new patient
  await ctx.client.request(gql`
    mutation {
      createPatient(
        data: {
          firstName: "Hans"
          lastName: "Daduya"
          sex: MALE
          dateOfBirth: "2022-04-27T07:38:00Z"
          contactNum: "1234567890"
          address: "Jaro"
        }
      ) {
        firstName
        lastName
        dateOfBirth
      }
    }
  `)
})

it('should create a new medical record', async () => {
  const medStaffId = await prisma.medicalStaff
    .findMany()
    .then((medStaffs) => medStaffs[0].id)

  const patientId = await prisma.patient
    .findMany()
    .then((patients) => patients[0].id)

  const createMedicalRecord = await ctx.client.request(
    gql`
      mutation ($data: CreateMedicalRecordInput!) {
        createMedicalRecord(data: $data) {
          diagnosis
          prescription
          date
          patient {
            fullName
          }
          medStaff {
            fullName
          }
        }
      }
    `,
    {
      data: {
        diagnosis: 'Diagnosis',
        prescription: 'Prescription',
        date: '2020-04-27T07:38:00Z',
        patientId,
        medStaffId,
      },
    },
  )

  expect(createMedicalRecord).toMatchInlineSnapshot(`
    Object {
      "createMedicalRecord": Object {
        "date": "2020-04-27T07:38:00.000Z",
        "diagnosis": "Diagnosis",
        "medStaff": Object {
          "fullName": "Jose Rizal",
        },
        "patient": Object {
          "fullName": "Hans Daduya",
        },
        "prescription": "Prescription",
      },
    }
  `)
})

afterEach(async () => {
  await prisma.medicalRecord.deleteMany({})
  await prisma.schedule.deleteMany({})
  await prisma.medicalStaff.deleteMany({})
  await prisma.patient.deleteMany({})
})
