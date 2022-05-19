import { Controller } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { FormInputProps, FormInputSelectMedStaffProps } from './FormInputProps'

export const FormInputSelectMedStaff = ({
  name,
  label,
  data,
  control,
  register,
  errors,
}: FormInputSelectMedStaffProps) => (
  <FormControl error={!!errors[name]}>
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

export const FormInputSelect = ({
  name,
  label,
  data,
  control,
  register,
  errors,
}: FormInputProps) => (
  <FormControl error={!!errors[name]}>
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
    sx={{ marginTop: -0.3, width: 250 }}
    label={label}
    multiline
    rows={2}
    {...register(name)}
    helperText={errors[name]?.message}
    error={!!errors[name]}
    placeholder={placeholder}
    InputProps={{ style: { fontSize: 12 } }}
  />
)

export const FormInputTime = ({
  name,
  control,
  register,
  errors,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={null}
    render={({ field: { onChange, value } }) => (
      <TimePicker
        ampm={false}
        clearable
        value={value}
        onChange={(time) => onChange(time)}
        renderInput={(params) => (
          <TextField
            sx={{ marginTop: -0.3, width: 250 }}
            variant="outlined"
            margin="dense"
            {...params}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        )}
      />
    )}
  />
)
