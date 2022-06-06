import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { FormInputProps, FormInputSelectMedStaffProps } from './FormInputProps'

export const FormInputSelectMedStaff = ({
  name,
  label,
  data,
  onSavedValue,
  control,
  register,
  errors,
}: FormInputSelectMedStaffProps) => (
  <FormControl error={!!errors[name]}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            defaultValue={null}
            label={label}
            value={value || onSavedValue}
            onChange={onChange}
            name={name}
          >
            {data &&
              data.medicalStaff.map((item) => (
                <MenuItem value={item.id} key={item.id} {...register(name)}>
                  Dr. {item.lastName}
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
    multiline
    rows={3}
    {...register(name)}
    helperText={errors[name]?.message}
    error={!!errors[name]}
    InputProps={{ style: { fontSize: 12 } }}
  />
)
