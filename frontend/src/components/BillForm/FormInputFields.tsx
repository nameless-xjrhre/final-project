import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
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
  control,
  placeholder,
  register,
  errors,
}: FormInputProps) => (
  <FormControl error={!!errors[name]} sx={{ marginTop: 2.3 }}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value } }) => (
        <>
          <OutlinedInput
            value={value || ''}
            startAdornment={<InputAdornment position="start">₱</InputAdornment>}
            placeholder={placeholder}
            label={label}
            {...register(name)}
            error={!!errors[name]}
            sx={{ width: 250 }}
          />
          <FormHelperText sx={{ color: '#d32f2f' }}>
            {errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  </FormControl>
)
