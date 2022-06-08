/* eslint-disable no-unused-vars */
import { UseFormRegister, Control, FieldValues } from 'react-hook-form'
import { gql } from 'urql'
import { ScheduleStatus } from '../../graphql/generated'

export interface AvailableStaffsQueryData {
  availableStaffs: {
    id: number
    lastName: string
    schedules: {
      status: ScheduleStatus
      startTime: string
      endTime: string
    }
  }[]
}

export const availableStaffsQueryDocument = gql`
  query AvailableStaffs {
    availableStaffs {
      id
      lastName
      schedules {
        status
        startTime
        endTime
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
