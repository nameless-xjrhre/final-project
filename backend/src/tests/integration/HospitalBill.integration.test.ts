import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

beforeEach(async () => {
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

  const medStaffId = await prisma.medicalStaff
    .findMany()
    .then((staff) => staff[0].id)

  await ctx.client.request(
    gql`
      mutation ($medStaffId: Int!) {
        createAppointmentWithPatient(
          appointment: {
            visitType: ROUTINE
            date: "2022-05-27T07:38:00Z"
            note: "This is a test appointment"
            status: PENDING
          }
          patient: {
            firstName: "Ralph"
            lastName: "Ayongao"
            sex: MALE
            dateOfBirth: "2001-04-05T05:25:00Z"
            contactNum: "09234820934"
            address: "Tagbak, Jaro"
          }
          medStaffId: $medStaffId
        ) {
          date
          note
          visitType
          status
        }
      }
    `,
    {
      medStaffId,
    },
  )
})

it('should add a new hospital bill to an appointment', async () => {
  const appointmentId = await prisma.appointment
    .findMany()
    .then((appointments) => appointments[0].id)

  const patientId = await prisma.appointment
    .findMany()
    .then((appointments) => appointments[0])
    .then((appointment) => appointment.patientId)

  const medStaffId = await prisma.appointment
    .findMany()
    .then((appointments) => appointments[0])
    .then((appointment) => appointment.medStaffId)

  const hospitalBill = await ctx.client.request(
    gql`
      mutation ($appointmentId: Int!, $data: CreateHospitalBillInput!) {
        createHospitalBill(appointmentId: $appointmentId, data: $data) {
          amount
          date
          deadlineDate
          medStaff {
            fullName
          }
          patient {
            fullName
          }
        }
      }
    `,
    {
      appointmentId,
      data: {
        status: 'UNPAID',
        amount: 100,
        date: '2022-05-27T07:38:00Z',
        deadlineDate: '2022-05-27T09:38:00Z',
        medStaffId,
        patientId,
      },
    },
  )

  expect(hospitalBill).toMatchInlineSnapshot(`
    Object {
      "createHospitalBill": Object {
        "amount": 100,
        "date": "2022-05-27T07:38:00.000Z",
        "deadlineDate": "2022-05-27T09:38:00.000Z",
        "medStaff": Object {
          "fullName": "Jose Rizal",
        },
        "patient": Object {
          "fullName": "Ralph Ayongao",
        },
      },
    }
  `)
})

afterEach(async () => {
  await prisma.hospitalBill.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.medicalStaff.deleteMany()
})
