/* eslint-disable no-unused-vars */
import { UseFormRegister, Control, FieldValues } from 'react-hook-form'
import { gql } from 'urql'
import { ScheduleStatus } from '../../graphql/generated'
import {
  AvailableStaffsQueryData,
  PatientQueryData,
} from './AppointmentQueries'

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
