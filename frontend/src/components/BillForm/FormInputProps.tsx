/* eslint-disable no-unused-vars */
import React from 'react'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import { AppointmentStatus } from '../../graphql/generated'

interface Appointment {
  id: number
  visitType: string
  date: Date
  status: AppointmentStatus
  patient: {
    id: number
    fullName: string
  }
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

export default interface CustomFormProps {
  handleClose: (e: any) => void
  open: boolean
  apppointment: Appointment
}
