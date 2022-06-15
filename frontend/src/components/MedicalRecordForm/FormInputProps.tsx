import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import { gql } from 'urql'

export interface MedicalStaffQueryData {
  medicalStaff: {
    id: number
    lastName: string
  }[]
}

export const medicalStaffQueryDocument = gql`
  query MedicalStaffQuery {
    medicalStaff {
      id
      lastName
    }
  }
`

export interface FormInputProps {
  id?: string
  name: string
  label: string
  placeholder?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}

export interface FormInputSelectMedStaffProps {
  id?: string
  name: string
  label: string
  onSavedValue?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  data: MedicalStaffQueryData
}
