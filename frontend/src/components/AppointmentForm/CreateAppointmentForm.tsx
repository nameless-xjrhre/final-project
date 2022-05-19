import * as React from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from 'urql'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'
import {
  AppointmentStatus,
  MutationCreateAppointmentArgs,
} from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

const appointmentSchema = object().shape({
  visitType: string().required('Select type of visit.'),
  patient: string().required('Select patient.'),
  medicalStaff: string().required('Select preferred doctor.'),
  appointmentDate: string().nullable().required('Select appointment date.'),
  note: string().required('Provide reason for appointment.'),
})

const CreateAppointment = gql`
  mutation CreateAppointment(
    $data: CreateAppointmentInput!
    $medStaffId: Int!
    $patientId: Int!
  ) {
    createAppointment(
      data: $data
      medStaffId: $medStaffId
      patientId: $patientId
    ) {
      id
      date
      visitType
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export default function CreateAppointmentForm({
  open,
  handleClose,
}: CustomFormProps) {
  const [, createAppointment] = useMutation(CreateAppointment)
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
    resolver: yupResolver(appointmentSchema),
  })

  const handleCreateAppointment = handleSubmit((data) => {
    const input: MutationCreateAppointmentArgs = {
      data: {
        date: new Date(data.appointmentDate),
        visitType: data.visitType,
        status: AppointmentStatus.Pending,
        // note: data.note
      },
      medStaffId: parseInt(data.medicalStaff, 10),
      patientId: parseInt(data.patient, 10),
    }

    handleSubmitting()
    createAppointment(input)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert()
        } else {
          console.log(result)
          handleClose(handleComplete)
          showSuccessAlert()
        }
      })
      .catch((err) => console.error(err))
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateAppointment()
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Create Appointment
        </Typography>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            handleClose(e)
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      <AppointmentForm
        control={control}
        register={register}
        errors={errors}
        isNewAppointment={false}
      />
      <Button
        onClick={(e) => handleSubmitForm(e)}
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
      >
        Book Now
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
