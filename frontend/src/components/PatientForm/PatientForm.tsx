import * as React from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, mixed } from 'yup'
import { useMutation, gql } from 'urql'
import { FormInputText, FormInputRadio, FormInputDate } from './FormInputFields'
import { MutationCreatePatientArgs, Sex } from '../../graphql/generated'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 3,
}

const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        justifyContent: 'space-between',
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          width: 255,
        },
        variant: 'outlined',
        margin: 'normal',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 13,
        },
      },
    },
  },
})

interface Patient {
  patients: {
    id: number
    firstName: string
    lastName: string
    sex: Sex
    dateObBirth: Date
    contactNum: string
    address: string
  }[]
}

const CreatePatient = gql`
  mutation CreatePatient(
    $firstName: String!
    $lastName: String!
    $sex: Sex!
    $dateOfBirth: DateTime!
    $contactNum: String!
    $address: String!
  ) {
    createPatient(
      firstName: $firstName
      lastName: $lastName
      sex: $sex
      dateOfBirth: $dateOfBirth
      contactNum: $contactNum
      address: $address
    ) {
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
interface PatientFormProps {
  // eslint-disable-next-line no-unused-vars
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  open: boolean
}

export default function PatientForm({ handleClose, open }: PatientFormProps) {
  const [, createPatient] = useMutation<Patient>(CreatePatient)

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientSchema),
  })

  const submitCreatePatient = handleSubmit((data) => {
    const input: MutationCreatePatientArgs = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      sex: data.sex,
    }
    createPatient(input).then((result) => console.log(result))
  })

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open}>
        <Box sx={style}>
          <Grid container>
            <Typography variant="h6" color="GrayText">
              Add Patient
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
            onClick={submitCreatePatient}
          >
            Add Patient
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}
