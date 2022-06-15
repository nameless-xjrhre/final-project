/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react'
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
import { useMutation, useQuery } from 'urql'
import CustomForm from '../CustomForm'
import { AppointmentFormProps } from '../CustomFormProps'
import Form from './Form'
import {
  AppointmentStatus,
  MutationCreateAppointmentArgs,
  MutationEditAppointmentArgs,
} from '../../graphql/generated'
import {
  disableNoScheduleDays,
  getCompleteDate,
  getSelectedStaffSchedules,
  showFailAlert,
  showSuccessAlert,
} from '../../utils'
import {
  AvailableStaffsQueryData,
  AvailableStaffsQueryDocument,
  PatientQueryData,
  PatientQueryDataDocument,
} from './AppointmentQueries'
import { CreateAppointment, UpdateAppointment } from './AppointmentMutations'

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

export default function AppointmentForm({
  open,
  handleClose,
  isNewAppointment,
  appointment,
  toUpdate,
}: AppointmentFormProps) {
  const [complete, setComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)

  const [availableStaffs] = useQuery<AvailableStaffsQueryData>({
    query: AvailableStaffsQueryDocument,
  })
  const [patients] = useQuery<PatientQueryData>({
    query: PatientQueryDataDocument,
  })

  const [, createAppointment] = useMutation(CreateAppointment)
  const [, updateAppointment] = useMutation(UpdateAppointment)

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
    watch,
    formState: { errors },
  } = useForm({
    resolver: !toUpdate
      ? yupResolver(createAppointmentSchema)
      : yupResolver(updateAppointmentSchema),
  })

  const days = [0, 1, 2, 3, 4, 5, 6]

  const selectedStaffValue = watch('medicalStaff')

  useEffect(() => {
    typeof selectedStaffValue === 'number'
      ? setIsDisabled(false)
      : setIsDisabled(true)
  })

  const handleCreate = (createInput: MutationCreateAppointmentArgs) =>
    createAppointment(createInput)
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

  const handleUpdate = (updateInput: MutationEditAppointmentArgs) =>
    updateAppointment(updateInput)
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

  const handleCreateAppointment = handleSubmit((data) => {
    const completeDate = new Date(
      getCompleteDate(data.appointmentDate, data.appointmentTime),
    )
    handleSubmitting()
    if (!toUpdate) {
      const createInput: MutationCreateAppointmentArgs = {
        data: {
          date: completeDate,
          visitType: data.visitType,
          status: AppointmentStatus.Pending,
          note: data.note,
        },
        medStaffId: parseInt(data.medicalStaff, 10),
        patientId: parseInt(data.patient, 10),
      }
      handleCreate(createInput)
    } else {
      const updateInput: MutationEditAppointmentArgs = {
        id: appointment!.id,
        data: {
          date: completeDate || appointment?.date,
          visitType: data.visitType || appointment?.visitType,
          note: data.note,
        },
      }
      handleUpdate(updateInput)
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
        <Typography variant="h6" color="GrayText" data-testid="form-title">
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
        <Form
          control={control}
          register={register}
          errors={errors}
          isNewAppointment={false}
          toUpdate
          appointment={appointment}
          disableNoScheduleDays={(date: Date) =>
            disableNoScheduleDays(date, appointment!.medStaff.schedules, days)
          }
          patients={patients.data!}
          availableStaffs={availableStaffs.data!}
        />
      ) : (
        <Form
          control={control}
          register={register}
          errors={errors}
          isNewAppointment={false}
          toUpdate={false}
          disableNoScheduleDays={(date: Date) =>
            disableNoScheduleDays(
              date,
              getSelectedStaffSchedules(
                selectedStaffValue,
                availableStaffs.data!.availableStaffs,
              ),
              days,
            )
          }
          isDisabled={isDisabled}
          patients={patients.data!}
          availableStaffs={availableStaffs.data!}
        />
      )}
      <Button
        type="submit"
        onClick={(e) => {
          handleSubmitForm(e)
        }}
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
