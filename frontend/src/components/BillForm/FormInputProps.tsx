/* eslint-disable no-unused-vars */
import React from 'react'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'

interface Appointment {
  id: number
  visitType: string
  date: Date
  status: string
  patient: {
    fullName: string
  }
  medStaff: {
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
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  open: boolean
  apppointment: Appointment
}
