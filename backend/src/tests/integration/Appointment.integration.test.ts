import { gql } from 'graphql-request'
import { context } from '../../context'
import { createTestContext } from '../__helpers'

const { prisma } = context

const ctx = createTestContext()

it('should create an appointment with new patient', async () => {
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

  const createPatient = await ctx.client.request(
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

  expect(createPatient).toMatchInlineSnapshot(`
    Object {
      "createAppointmentWithPatient": Object {
        "date": "2022-05-27T07:38:00.000Z",
        "note": "This is a test appointment",
        "status": "PENDING",
        "visitType": "ROUTINE",
      },
    }
  `)
})

it('should edit an appointment', async () => {
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

  const appointmentId = await prisma.appointment
    .findMany()
    .then((appointments) => appointments[0].id)

  const editAppointment = await ctx.client.request(
    gql`
      mutation ($appointmentId: Int!) {
        editAppointment(
          id: $appointmentId
          data: {
            visitType: FOLLOWUP
            note: "This is a test appointment"
            status: DONE
          }
        ) {
          note
          visitType
          status
        }
      }
    `,
    {
      appointmentId,
    },
  )

  expect(editAppointment).toMatchInlineSnapshot(`
    Object {
      "editAppointment": Object {
        "note": "This is a test appointment",
        "status": "DONE",
        "visitType": "FOLLOWUP",
      },
    }
  `)
})

afterEach(async () => {
  await prisma.appointment.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.medicalStaff.deleteMany()
})
