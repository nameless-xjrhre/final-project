/* eslint-disable no-unused-vars */
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import {
  AppointmentStatus,
  BillStatus,
  ScheduleStatus,
  VisitType,
} from '../graphql/generated'

export interface Schedule {
  id: number
  status: ScheduleStatus
  startTime: string
  endTime: string
}

export interface Appointment {
  id: number
  visitType: VisitType
  date: string
  status: AppointmentStatus
  note: string
  patient: {
    id: number
    fullName: string
  }
  medStaff: {
    id: number
    fullName: string
    schedules: Schedule[]
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

export interface Bill {
  id: number
  date: Date
  amount: number
  status: BillStatus
  deadlineDate: Date
  patient: {
    id: number
  }
  medStaff: {
    id: number
  }
}

export interface MedicalRecord {
  id: number
  date: Date
  diagnosis: string
  prescription: string
  medStaff: {
    id: number
    fullName: string
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
  disableNoScheduleDays?: (days: any) => boolean
  onSubmit?: (data: { [x: string]: any }) => void
}

export interface PatientFormProps {
  handleClose: (e: any) => void
  open: boolean
  patient?: Patient
}

export interface BillFormProps {
  handleClose: (e: any) => void
  open: boolean
  toUpdate?: boolean
  bill?: Bill
  appointment?: Appointment
}

export interface ScheduleFormProps {
  handleClose: (e: any) => void
  open: boolean
  id: number
}

export interface MedicalRecordFormProps {
  handleClose: (e: any) => void
  open: boolean
  medicalRecord?: MedicalRecord
  patientId?: number
  toUpdate?: boolean
}

export default interface CustomFormProps {
  handleClose: (e: any) => void
  open: boolean
}
