/* eslint-disable no-nested-ternary */
import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { useQuery } from 'urql'
import { VisitType } from '../../graphql/generated'
import { Appointment } from '../CustomFormProps'
import {
  FormInputText,
  FormInputDate,
  FormInputSelect,
  FormInputSelectPatient,
  FormInputSelectMedStaff,
  FormInputTime,
} from './FormInpuFields'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
  PatientQueryData,
  patientQueryNameDocument,
} from './FormInputProps'

interface AppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  isNewAppointment: boolean
  toUpdate: boolean
  appointment?: Appointment
}

const visitTypes = [VisitType.Followup, VisitType.Routine, VisitType.Urgent]
// const status = [
//   AppointmentStatus.Pending,
//   AppointmentStatus.Expired,
//   AppointmentStatus.Done,
//   AppointmentStatus.Canceled,
// ]

export default function AppointmentForm({
  control,
  register,
  errors,
  isNewAppointment,
  toUpdate,
  appointment,
}: AppointmentFormProps) {
  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })

  const [patient] = useQuery<PatientQueryData>({
    query: patientQueryNameDocument,
  })

  return (
    <>
      {!isNewAppointment ? (
        toUpdate ? (
          ''
        ) : (
          <Grid>
            <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
              Select Patient
            </Typography>
            <Grid container mt={2}>
              <FormInputSelectPatient
                name="patient"
                label="Select Patient"
                data={patient.data!}
                onSavedValue={appointment?.patient.id.toString()}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
        )
      ) : (
        ''
      )}
      <Grid container>
        <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
          Select Service
        </Typography>
        <Typography variant="body2" color="GrayText" mt={2} mr={14}>
          Select Date and Time
        </Typography>
      </Grid>
      <Grid container mt={2}>
        <FormInputSelect
          name="visitType"
          label="Select Visit Type"
          data={visitTypes}
          onSavedValue={appointment?.visitType}
          control={control}
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputDate
            id="date"
            name="appointmentDate"
            label="Select Date"
            onSavedValue={
              !isNewAppointment
                ? toUpdate
                  ? appointment!.date.toString()
                  : ''
                : ''
            }
            control={control}
            register={register}
            errors={errors}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container>
        <FormInputSelectMedStaff
          name="medicalStaff"
          label="Select Doctor"
          data={medicalStaff.data!}
          onSavedValue={appointment?.medStaff.id.toString()}
          control={control}
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputTime
            name="appointmentTime"
            label="Select Time"
            onSavedValue={
              !isNewAppointment
                ? toUpdate
                  ? appointment!.date.toString()
                  : ''
                : ''
            }
            errors={errors}
            register={register}
            control={control}
          />
        </LocalizationProvider>
      </Grid>
      <Grid mt={3}>
        <FormInputText
          id="note"
          name="note"
          label="Brief reason for appointment"
          placeholder={appointment?.note}
          register={register}
          errors={errors}
        />
      </Grid>
    </>
  )
}
