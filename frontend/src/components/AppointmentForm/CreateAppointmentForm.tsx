/* eslint-disable no-case-declarations */
import React, { useState } from 'react'
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
import { AppointmentFormProps } from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'
import {
  AppointmentStatus,
  MutationCreateAppointmentArgs,
  MutationEditAppointmentArgs,
} from '../../graphql/generated'
import { getCompleteDate, showFailAlert, showSuccessAlert } from '../../utils'

const createAppointmentSchema = object().shape({
  visitType: string().required('Select type of visit.'),
  patient: string().required('Select patient.'),
  medicalStaff: string().required('Select preferred doctor.'),
  appointmentDate: string().nullable().required('Select appointment date.'),
  appointmentTime: string().nullable().required('Select appointment time.'),
  note: string().required('Provide reason for appointment.'),
})

const updateAppointmentSchema = object().shape({
  visitType: string(),
  status: string(),
  medicalStaff: string(),
  appointmentDate: string().nullable(),
  appointmentTime: string().nullable(),
  note: string(),
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
      note
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

const UpdateAppointment = gql`
  mutation UpdateAppointment($id: Int!, $data: EditAppointmentInput!) {
    editAppointment(id: $id, data: $data) {
      id
      date
      note
      visitType
      status
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
  isNewAppointment,
  appointment,
  toUpdate,
}: AppointmentFormProps) {
  const [, createAppointment] = useMutation(CreateAppointment)
  const [, updateAppointment] = useMutation(UpdateAppointment)
  const [complete, setComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    resolver: !toUpdate
      ? yupResolver(createAppointmentSchema)
      : yupResolver(updateAppointmentSchema),
  })

  const handleCreateAppointment = handleSubmit((data) => {
    handleSubmitting()
    if (!toUpdate) {
      const createInput: MutationCreateAppointmentArgs = {
        data: {
          date: new Date(
            getCompleteDate(data.appointmentDate, data.appointmentTime),
          ),
          visitType: data.visitType,
          status: AppointmentStatus.Pending,
          note: data.note,
        },
        medStaffId: parseInt(data.medicalStaff, 10),
        patientId: parseInt(data.patient, 10),
      }
      createAppointment(createInput)
        .then((result) => {
          if (result.error) {
            console.log(result)
            handleClose(handleComplete)
            showFailAlert('Data has not been saved.')
          } else {
            console.log(result)
            handleClose(handleComplete)
            showSuccessAlert('Data has been saved.')
          }
        })
        .catch((err) => console.error(err))
    } else {
      const updateInput: MutationEditAppointmentArgs = {
        id: appointment!.id,
        data: {
          date:
            new Date(
              getCompleteDate(data.appointmentDate, data.appointmentTime),
            ) || appointment?.date,
          visitType: data.visitType || appointment?.visitType,
          status: data.status || appointment?.status,
          note: data.note || appointment?.note,
        },
      }
      updateAppointment(updateInput)
        .then((result) => {
          if (result.error) {
            console.log(result)
            handleClose(handleComplete)
            showFailAlert('Data has not been saved.')
          } else {
            console.log(result)
            handleClose(handleComplete)
            showSuccessAlert('Data has been saved.')
          }
        })
        .catch((err) => console.error(err))
    }
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
          {!isNewAppointment && !toUpdate
            ? 'Create Appointment'
            : 'Edit Appointment'}
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
      {toUpdate ? (
        <AppointmentForm
          control={control}
          register={register}
          errors={errors}
          isNewAppointment={false}
          toUpdate
          appointment={appointment}
        />
      ) : (
        <AppointmentForm
          control={control}
          register={register}
          errors={errors}
          isNewAppointment={false}
          toUpdate={false}
        />
      )}
      <Button
        type="submit"
        onClick={(e) => handleSubmitForm(e)}
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
      >
        {!isNewAppointment && !toUpdate ? 'Book Now' : 'Save Changes'}
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 62,
          }}
        />
      )}
    </CustomForm>
  )
}
