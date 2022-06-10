/* eslint-disable no-unused-vars */
import { UseFormRegister, Control, FieldValues } from 'react-hook-form'
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

export const availableStaffsQueryDocument = gql`
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

export const patientQueryNameDocument = gql`
  query PatientFullName {
    patients {
      id
      fullName
    }
  }
`

export interface FormInputProps {
  id?: string
  name: string
  label: string
  placeholder?: string
  disableNoScheduleDays?: (days: any) => boolean
  isDisabled?: boolean
  onSavedValue?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  data?: string[]
}

export interface FormInputSelectMedStaffProps {
  id?: string
  name: string
  label: string
  onSavedValue?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  data: AvailableStaffsQueryData
}

export interface FormInputSelectPatientProps {
  id?: string
  name: string
  label: string
  onSavedValue?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  data: PatientQueryData
}
