/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { VisitType } from '../../graphql/generated'
import { Appointment } from '../CustomFormProps'
import {
  PatientQueryData,
  AvailableStaffsQueryData,
} from './AppointmentQueries'
import {
  FormInputText,
  FormInputDate,
  FormInputSelect,
  FormInputSelectPatient,
  FormInputSelectMedStaff,
  FormInputTime,
} from './FormInpuFields'

interface AppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  isNewAppointment: boolean
  toUpdate: boolean
  appointment?: Appointment
  disableNoScheduleDays: (days: any) => boolean
  isDisabled?: boolean
  patients: PatientQueryData
  availableStaffs: AvailableStaffsQueryData
}

const visitTypes = [VisitType.Followup, VisitType.Routine, VisitType.Urgent]

export default function Form({
  control,
  register,
  errors,
  isNewAppointment,
  toUpdate,
  appointment,
  disableNoScheduleDays,
  isDisabled,
  patients,
  availableStaffs,
}: AppointmentFormProps) {
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
                data={patients}
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
          id="visit type"
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
            aria-label="date-selector"
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
            disableNoScheduleDays={disableNoScheduleDays}
            isDisabled={isDisabled}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container>
        <FormInputSelectMedStaff
          name="medicalStaff"
          label="Select Doctor"
          data={availableStaffs}
          onSavedValue={appointment?.medStaff.id.toString()}
          control={control}
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputTime
            aria-label="time-selector"
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
            isDisabled={isDisabled}
          />
        </LocalizationProvider>
      </Grid>
      <Grid mt={3}>
        <FormInputText
          id="note"
          name="note"
          control={control}
          label="Brief reason for appointment"
          placeholder={appointment?.note}
          register={register}
          errors={errors}
        />
      </Grid>
    </>
  )
}
