import * as React from 'react'
import { Typography, Button, IconButton, Divider, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, mixed } from 'yup'
import { FormInputText, FormInputRadio, FormInputDate } from './FormInputFields'
import { Sex } from '../../graphql/generated'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'

const patientSchema = object().shape({
  firstName: string().required('Enter your first name.'),
  lastName: string().required('Enter your last name.'),
  sex: mixed().oneOf([Sex.Male, Sex.Female]).required('Choose your gender.'),
  dateOfBirth: string().nullable().required('Select date of birth.'),
  contactNum: string()
    .required('Enter your contact number.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  address: string().required('Enter your address.'),
})

export default function EditPatientForm({
  handleClose,
  open,
}: CustomFormProps) {
  const {
    register,
    control,
    // handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientSchema),
  })

  //   const submitUpdatePatientForm = handleSubmit((data) => {
  //   })

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Edit Patient
        </Typography>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            handleClose(e)
            reset()
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
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
      <Button
        variant="contained"
        sx={{
          background: '#336CFB',
          display: 'block',
          marginLeft: 'auto',
        }}
        // onClick={submitUpdatePatientForm}
      >
        Save Changes
      </Button>
    </CustomForm>
  )
}
