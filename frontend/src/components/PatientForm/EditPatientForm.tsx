import * as React from 'react'
import {
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  CircularProgress,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import { gql, useMutation } from 'urql'
import { FormInputText, FormInputRadio, FormInputDate } from './FormInputFields'
import { MutationEditPatientArgs } from '../../graphql/generated'
import CustomForm from '../CustomForm'
import { PatientFormProps } from '../CustomFormProps'
import { showFailAlert, showSuccessAlert } from '../../utils'

const patientSchema = object().shape({
  firstName: string(),
  lastName: string(),
  sex: string().nullable(),
  dateOfBirth: string().nullable(),
  contactNum: string().matches(
    /^(09|\+639)\d{9}$/,
    'Please enter a valid contact number.',
  ),
  address: string(),
})

const UpdatePatient = gql`
  mutation UpdatePatient($id: Int!, $data: EditPatientInput!) {
    editPatient(id: $id, data: $data) {
      id
      firstName
      lastName
      sex
      dateOfBirth
      contactNum
      address
    }
  }
`

export default function EditPatientForm({
  handleClose,
  open,
  patient,
}: PatientFormProps) {
  const [, updatePatient] = useMutation(UpdatePatient)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)

  const buttonSx = {
    ...(complete && {
      bgcolor: '#336CFB',
      '&:hover': {
        bgcolor: '#336CFB',
      },
    }),
    display: 'block',
    marginTop: 3,
    marginLeft: 'auto',
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientSchema),
  })

  const handleUpdatePatient = handleSubmit((data) => {
    const input: MutationEditPatientArgs = {
      id: patient!.id,
      data: {
        firstName: data.firstName || patient?.firstName,
        lastName: data.lastName || patient?.lastName,
        address: data.address || patient?.address,
        contactNum: data.contactNum || patient?.contactNum,
        dateOfBirth:
          new Date(data.dateOfBirth) || new Date(patient!.dateOfBirth),
        sex: data.sex || patient?.sex,
      },
    }

    handleSubmitting()
    updatePatient(input)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert('Data has not been saved.')
        } else {
          handleClose(handleComplete)
          showSuccessAlert('Data has been saved.')
        }
      })
      .catch((err) => console.error(err))
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleUpdatePatient(e)
  }

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
          placeholder={patient!.firstName}
          register={register}
          errors={errors}
        />
        <FormInputRadio
          id="gender"
          name="sex"
          label="Gender"
          onSavedValue={patient!.sex}
          register={register}
          errors={errors}
        />
      </Grid>
      <Grid container mt={-2} mb={1}>
        <FormInputText
          id="last-name"
          name="lastName"
          label="Last Name"
          placeholder={patient!.lastName}
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputDate
            id="date-of-birth"
            name="dateOfBirth"
            label="Date of Birth"
            onSavedValue={patient!.dateOfBirth.toString()}
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
          placeholder={patient!.contactNum}
          register={register}
          errors={errors}
        />
        <FormInputText
          id="address"
          name="address"
          label="Address"
          placeholder={patient!.address}
          register={register}
          errors={errors}
        />
      </Grid>
      <Button
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
        onClick={(e) => handleSubmitForm(e)}
      >
        Save Changes
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 62.5,
          }}
        />
      )}
    </CustomForm>
  )
}
