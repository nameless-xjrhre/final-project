/* eslint-disable no-unused-vars */
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import { AppointmentStatus, Sex, VisitType } from '../graphql/generated'

export interface Appointment {
  id: number
  visitType: VisitType
  date: Date
  status: AppointmentStatus
  note: string
  patient: {
    id: number
    fullName: string
  }
  medStaff: {
    id: number
    fullName: string
  }
}

export interface Patient {
  id: number
  fullName: string
  sex: string
  firstName: string
  lastName: string
  contactNum: string
  dateOfBirth: Date
  address: string
  latestAppointment: {
    date: Date
    visitType: string
    medStaff: {
      fullName: string
    }
  }
}

export interface FormInputProps {
  id?: string
  name: string
  label: string
  placeholder?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  data?: string[]
}

export interface AppointmentFormProps {
  handleClose: (e: any) => void
  open: boolean
  isNewAppointment?: boolean
  toUpdate?: boolean
  appointment?: Appointment
}

export interface PatientFormProps {
  handleClose: (e: any) => void
  open: boolean
  patient?: Patient
}

export default interface CustomFormProps {
  handleClose: (e: any) => void
  open: boolean
}
