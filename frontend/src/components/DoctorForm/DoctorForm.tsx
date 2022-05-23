import { Typography, Grid } from '@mui/material'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FormInputText } from './FormInputFields'

interface PatientFormProps {
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}

export default function PatientForm({ register, errors }: PatientFormProps) {
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
        <FormInputText
          id="last-name"
          name="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
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
