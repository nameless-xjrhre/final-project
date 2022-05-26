import { UseFormRegister, Control, FieldValues } from 'react-hook-form'
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
  data: MedicalStaffQueryData
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
