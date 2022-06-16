import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { FormInputText, FormInputRadio, FormInputDate } from './FormInputFields'

interface PatientFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}

export default function PatientForm({
  control,
  register,
  errors,
}: PatientFormProps) {
  return (
    <>
      <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
        Personal Information
      </Typography>
      <Grid container>
        <FormInputText
          id="first-name"
          name="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FormInputRadio
          id="gender"
          name="sex"
          label="Gender"
          register={register}
          errors={errors}
        />
      </Grid>
      <Grid container mt={-2} mb={1}>
        <FormInputText
          id="last-name"
          name="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputDate
            id="date-of-birth"
            name="dateOfBirth"
            label="Date of Birth"
            control={control}
            register={register}
            errors={errors}
          />
        </LocalizationProvider>
      </Grid>
      <Typography variant="body2" mb={1} color="GrayText">
        Contact Information
      </Typography>
      <Grid container mt={-2} mb={3}>
        <FormInputText
          id="contact-num"
          name="contactNum"
          label="Contact Number"
          register={register}
          errors={errors}
        />
        <FormInputText
          id="address"
          name="address"
          label="Address"
          register={register}
          errors={errors}
        />
      </Grid>
    </>
  )
}
