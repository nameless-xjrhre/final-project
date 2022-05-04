import { UseFormRegister, Control, FieldValues } from 'react-hook-form'

export interface FormInputProps {
  id: string
  name: string
  label: string
  placeholder?: string
  control?: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}
