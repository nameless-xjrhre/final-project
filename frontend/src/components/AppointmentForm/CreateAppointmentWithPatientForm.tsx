import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import AddPatientForm from '../PatientForm'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'

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
  sex: string().required('Choose your gender.'),
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
  note: string().required('Provide reason for appointment.'),
})

export default function CreateAppointmentWithPatientForm({
  handleClose,
  open,
}: CustomFormProps) {
  const [activeStep, setActiveStep] = React.useState(0)
  const isLastStep = activeStep === steps.length - 1
  // const [,createAppointmentWithPatient] = useMutation<AppointmentWithPatient>(
  //   CreateAppointmentWithPatient,
  // )

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
      const input = {
        address: data.address,
        firstName: data.firstName,
        lastName: data.lastName,
        contactNum: data.contactNum,
        dateOfBirth: new Date(data.dateOfBirth),
        sex: data.sex,
        patientId: 1,
        medStaffId: data.medicalStaff,
        date: data.appointmentDate,
        visitType: data.visitType,
        status: 'PENDING',
      }
      console.log(input)

      // createAppointmentWithPatient(input).then((result) => console.log(result))
    } else {
      handleNext()
    }
  })

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
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
          </Grid>
        ) : null}
        <Grid item>
          <Button
            onClick={submitMultiStepForm}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginLeft: 'auto' }}
          >
            {activeStep === steps.length - 1 ? 'Book Now' : 'Next'}
          </Button>
        </Grid>
      </Grid>
    </CustomForm>
  )
}
