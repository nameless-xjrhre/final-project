import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { FormInputProps } from './FormInputProps'
import { Sex } from '../../graphql/generated'

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

export const FormInputDate = ({
  name,
  label,
  onSavedValue,
  control,
  register,
  errors,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={null}
    render={({ field: { onChange, value } }) => (
      <DatePicker
        disableFuture
        label={label}
        openTo="year"
        views={['year', 'month', 'day']}
        value={value || onSavedValue}
        onChange={
          (date) => onChange(date.toLocaleDateString('en-CA')) // change format to 'YYYY-MM-DD'
        }
        renderInput={(params) => (
          <TextField
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

export const FormInputRadio = ({
  name,
  label,
  register,
  errors,
}: FormInputProps) => (
  <FormControl error={!!errors[name]} sx={{ width: 255 }}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup row name={name}>
      <FormControlLabel
        value={Sex.Male}
        control={<Radio {...register(name)} />}
        label="Male"
      />
      <FormControlLabel
        value={Sex.Female}
        control={<Radio {...register(name)} />}
        label="Female"
      />
    </RadioGroup>
    <FormHelperText sx={{ color: '#d32f2f' }}>
      {errors[name]?.message}
    </FormHelperText>
  </FormControl>
)
