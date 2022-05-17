import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './FormInputProps'

export const FormInputSelect = ({
  name,
  label,
  control,
  register,
  errors,
  data,
}: FormInputProps) => (
  <FormControl sx={{ marginTop: 2 }}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            label={label}
            value={value || ''}
            onChange={onChange}
            name={name}
          >
            {data?.map((item) => (
              <MenuItem value={item} key={item} {...register(name)}>
                {' '}
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: '#d32f2f' }}>
            {errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  </FormControl>
)

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
