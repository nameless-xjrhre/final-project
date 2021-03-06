import { Controller } from 'react-hook-form'
import {
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import {
  FormInputProps,
  FormInputSelectMedStaffProps,
  FormInputSelectPatientProps,
} from './FormInputProps'

export const FormInputSelectPatient = ({
  name,
  label,
  data,
  onSavedValue,
  control,
  register,
  errors,
}: FormInputSelectPatientProps) => (
  <FormControl
    error={!!errors[name]}
    aria-label="Select Patient"
    role="combobox"
  >
    <InputLabel id="select-patient" htmlFor="patient">
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            defaultValue=""
            label={label}
            value={value || onSavedValue}
            onChange={onChange}
            name={name}
          >
            {data &&
              data.patients.map((item) => (
                <MenuItem
                  data-testid={`patient-${item.id}`}
                  value={item.id}
                  key={item.id}
                  {...register(name)}
                >
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
  onSavedValue,
  control,
  register,
  errors,
}: FormInputSelectMedStaffProps) => (
  <FormControl
    error={!!errors[name]}
    aria-label="Select Doctor"
    role="combobox"
  >
    <InputLabel id="select-doctor" htmlFor="doctor">
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            defaultValue=""
            label={label}
            value={value || onSavedValue}
            onChange={onChange}
            name={name}
          >
            {data &&
              data.availableStaffs.map((availableStaff) => (
                <MenuItem
                  value={availableStaff.id}
                  key={availableStaff.id}
                  {...register(name)}
                >
                  Dr. {availableStaff.lastName}
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
  onSavedValue,
  data,
  control,
  register,
  errors,
}: FormInputProps) => (
  <FormControl error={!!errors[name]} aria-label="Visit Type" role="combobox">
    <InputLabel id="select-value" htmlFor="visitType">
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            defaultValue=""
            label={label}
            value={value || onSavedValue}
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
  control,
  placeholder,
  register,
  errors,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value } }) => (
      <TextField
        value={value}
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
    )}
  />
)

export const FormInputDate = ({
  name,
  label,
  control,
  onSavedValue,
  register,
  errors,
  disableNoScheduleDays,
  isDisabled,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <DatePicker
        disablePast
        label={label}
        openTo="month"
        views={['month', 'day']}
        value={value || onSavedValue}
        onChange={onChange}
        shouldDisableDate={disableNoScheduleDays}
        disabled={isDisabled}
        renderInput={(params) => (
          <TextField
            sx={{ marginTop: -0.3, width: 250 }}
            variant="outlined"
            margin="dense"
            value={value}
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

export const FormInputTime = ({
  name,
  label,
  control,
  onSavedValue,
  register,
  errors,
  isDisabled,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TimePicker
        ampm={false}
        clearable
        label={label}
        value={value || onSavedValue}
        onChange={(time) => onChange(time)}
        disabled={isDisabled}
        renderInput={(params) => (
          <TextField
            sx={{ marginTop: -0.3, width: 250 }}
            variant="outlined"
            margin="dense"
            {...params}
            {...register(name)}
            error={!!errors[name]}
            helperText={
              isDisabled ? (
                <i>Please select doctor first.</i>
              ) : (
                '' || errors[name]?.message
              )
            }
          />
        )}
      />
    )}
  />
)
