import * as React from 'react'
import { Grid, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from 'urql'
import swal from 'sweetalert'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'
import {
  AppointmentStatus,
  MutationCreateAppointmentArgs,
} from '../../graphql/generated'

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

    console.log(input)

    createAppointment(input).then((result) => console.log(result))
  })

  const showAlert = () =>
    swal({
      title: 'Success!',
      text: 'Your data has been saved.',
      icon: 'success',
    })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateAppointment()
    handleClose(e)
    showAlert()
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
        variant="contained"
        sx={{
          background: '#336CFB',
          display: 'block',
          marginLeft: 'auto',
          marginTop: 2,
        }}
      >
        Book Now
      </Button>
    </CustomForm>
  )
}
