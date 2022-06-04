import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import { gql, useMutation } from 'urql'
import AddPatientForm from '../PatientForm'
import CustomForm from '../CustomForm'
import { AppointmentFormProps } from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'
import {
  AppointmentStatus,
  MutationCreateAppointmentWithPatientArgs,
} from '../../graphql/generated'
import { getCompleteDate, showFailAlert, showSuccessAlert } from '../../utils'

const steps = ['Patient Data', 'Create Appointment']

const useStyles = {
  root: {
    '& .MuiSvgIcon-root.MuiStepIcon-root.Mui-active': {
      color: '#336CFB',
    },
  },
}

const patientSchema = object().shape({
  firstName: string().required('Enter your first name.'),
  lastName: string().required('Enter your last name.'),
  sex: string().nullable().required('Choose your gender.'),
  dateOfBirth: string().nullable().required('Select date of birth.'),
  contactNum: string()
    .required('Enter your contact number.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  address: string().required('Enter your address.'),
})

const appointmentSchema = object().shape({
  visitType: string().required('Select type of visit.'),
  medicalStaff: string().required('Select preferred doctor.'),
  appointmentDate: string().nullable().required('Select appointment date.'),
  appointmentTime: string().nullable().required('Select appointment time.'),
  note: string().required('Provide reason for appointment.'),
})

const CreateAppointmentWithPatient = gql`
  mutation CreateAppointmentWithPatient(
    $appointment: CreateAppointmentInput!
    $patient: CreatePatientInput!
    $medStaffId: Int!
  ) {
    createAppointmentWithPatient(
      appointment: $appointment
      patient: $patient
      medStaffId: $medStaffId
    ) {
      id
      date
      visitType
      status
      patient {
        firstName
        lastName
        sex
        dateOfBirth
        contactNum
        address
      }
      medStaff {
        id
      }
    }
  }
`

export default function CreateAppointmentWithPatientForm({
  handleClose,
  open,
}: AppointmentFormProps) {
  const [, createAppointmentWithPatient] = useMutation(
    CreateAppointmentWithPatient,
  )
  const [activeStep, setActiveStep] = React.useState(0)
  const isLastStep = activeStep === steps.length - 1
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
  } = useForm({
    resolver: isLastStep
      ? yupResolver(appointmentSchema)
      : yupResolver(patientSchema),
  })

  const handleNext = handleSubmit((data) => {
    console.log(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const submitMultiStepForm = handleSubmit((data) => {
    if (isLastStep) {
      const input: MutationCreateAppointmentWithPatientArgs = {
        appointment: {
          date: new Date(
            getCompleteDate(data.appointmentDate, data.appointmentTime),
          ),
          visitType: data.visitType,
          status: AppointmentStatus.Pending,
          note: data.note,
        },
        patient: {
          firstName: data.firstName,
          lastName: data.lastName,
          contactNum: data.contactNum,
          dateOfBirth: new Date(data.dateOfBirth),
          sex: data.sex,
          address: data.address,
        },
        medStaffId: parseInt(data.medicalStaff, 10),
      }
      handleSubmitting()
      createAppointmentWithPatient(input)
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
    } else {
      handleNext()
    }
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    submitMultiStepForm()
  }

  function getStepsContent(stepsIndex: number) {
    switch (stepsIndex) {
      case 0:
        return (
          <AddPatientForm
            control={control}
            register={register}
            errors={errors}
          />
        )
      case 1:
        return (
          <AppointmentForm
            control={control}
            register={register}
            errors={errors}
            isNewAppointment
            toUpdate={false}
          />
        )
      default:
        return null
    }
  }
  return (
    <CustomForm open={open}>
      <Grid container>
        <IconButton
          aria-label="close"
          sx={{ marginLeft: 'auto' }}
          onClick={(e) => {
            handleClose(e)
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Box sx={{ width: '100%' }} mb={3}>
        <Stepper alternativeLabel activeStep={activeStep} sx={useStyles.root}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Divider />
      <Grid container>
        {getStepsContent(activeStep)}
        {activeStep > 0 ? (
          <Grid item mt={3} mr={30}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          </Grid>
        ) : null}
        <Grid item>
          <Button
            onClick={(e) => handleSubmitForm(e)}
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
            sx={buttonSx}
          >
            {activeStep === steps.length - 1 ? 'Book Now' : 'Next'}
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={17}
              sx={{
                color: 'blue',
                position: 'absolute',
                marginTop: -3.5,
                marginLeft: 5.5,
              }}
            />
          )}
        </Grid>
      </Grid>
    </CustomForm>
  )
}
