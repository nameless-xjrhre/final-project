import { gql } from 'urql'

export const CreateAppointment = gql`
  mutation CreateAppointment(
    $data: CreateAppointmentInput!
    $medStaffId: Int!
    $patientId: Int!
  ) {
    createAppointment(
      data: $data
      medStaffId: $medStaffId
      patientId: $patientId
    ) {
      id
      date
      visitType
      note
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export const CreateAppointmentWithPatient = gql`
  mutation CreateAppointmentWithPatient(
    $appointment: CreateAppointmentInput!
    $patient: CreatePatientInput!
    $medStaffId: Int!
  ) {
    createAppointmentWithPatient(
      appointment: $appointment
      patient: $patient
      medStaffId: $medStaffId
    ) {
      id
      date
      visitType
      status
      patient {
        firstName
        lastName
        sex
        dateOfBirth
        contactNum
        address
      }
      medStaff {
        id
      }
    }
  }
`

export const UpdateAppointment = gql`
  mutation UpdateAppointment($id: Int!, $data: EditAppointmentInput!) {
    editAppointment(id: $id, data: $data) {
      id
      date
      note
      visitType
      status
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export const DeleteAppointment = gql`
  mutation DeleteAppointment($id: Int!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`
