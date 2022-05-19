import { Controller } from 'react-hook-form'
import {
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import {
  FormInputProps,
  FormInputSelectMedStaffProps,
  FormInputSelectPatientProps,
} from './FormInputProps'

export const FormInputSelectPatient = ({
  name,
  label,
  data,
  control,
  register,
  errors,
}: FormInputSelectPatientProps) => (
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
              data.patients.map((item) => (
                <MenuItem value={item.id} key={item.id} {...register(name)}>
                  {item.fullName}
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

export const FormInputDate = ({
  name,
  label,
  placeholder,
  control,
  register,
  errors,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={null}
    render={({ field: { onChange, value } }) => (
      <DateTimePicker
        disablePast
        label={label}
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={
          (date) => onChange(date.toLocaleDateString('en-CA')) // change format to 'YYYY-MM-DD'
        }
        renderInput={(params) => (
          <TextField
            sx={{ marginTop: -0.3, width: 250 }}
            placeholder={placeholder}
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
