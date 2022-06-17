import { gql } from 'urql'
import { ScheduleStatus } from '../../graphql/generated'

interface Schedule {
  id: number
  startTime: string
  endTime: string
  status: ScheduleStatus
  medStaff: {
    id: number
  }
}

export interface AvailableStaff {
  id: number
  firstName: string
  lastName: string
  address: string
  contactNum: string
  schedules: Schedule[]
}

export interface AvailableStaffsQueryData {
  availableStaffs: AvailableStaff[]
}

export const AvailableStaffsQueryDocument = gql`
  query AvailableStaffs {
    availableStaffs {
      id
      firstName
      lastName
      address
      contactNum
      schedules {
        id
        startTime
        endTime
        status
        medStaff {
          id
        }
      }
    }
  }
`

export interface PatientQueryData {
  patients: {
    id: number
    fullName: string
  }[]
}

export const PatientQueryDataDocument = gql`
  query PatientFullName {
    patients {
      id
      fullName
    }
  }
`
