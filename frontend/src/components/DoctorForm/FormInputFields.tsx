import TextField from '@mui/material/TextField'
import { FormInputProps } from './FormInputProps'

export const FormInputText = ({
  name,
  label,
  placeholder,
  register,
  errors,
}: FormInputProps) => (
  <TextField
    label={label}
    placeholder={placeholder}
    {...register(name)}
    helperText={errors[name]?.message}
    error={!!errors[name]}
    InputProps={{ style: { fontSize: 12 } }}
  />
)
