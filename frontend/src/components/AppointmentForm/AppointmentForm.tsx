import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { useQuery } from 'urql'
import { VisitType } from '../../graphql/generated'
import {
  FormInputText,
  FormInputDate,
  FormInputSelect,
  FormInputSelectPatient,
  FormInputSelectMedStaff,
} from './FormInpuFields'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
  PatientQueryData,
  patientQueryNameDocument,
} from './FormInputProps'

interface CreateAppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  isNewAppointment: boolean
}

const visitTypes = [VisitType.Followup, VisitType.Routine, VisitType.Urgent]

export default function AppointmentForm({
  control,
  register,
  errors,
  isNewAppointment,
}: CreateAppointmentFormProps) {
  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })

  const [patient] = useQuery<PatientQueryData>({
    query: patientQueryNameDocument,
  })

  return (
    <>
      {!isNewAppointment ? (
        <Grid>
          <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
            Select Patient
          </Typography>
          <Grid container mt={2}>
            <FormInputSelectPatient
              name="patient"
              label="Select Patient"
              data={patient.data!}
              control={control}
              register={register}
              errors={errors}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
      <Grid container>
        <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
          Select Service
        </Typography>
        <Typography variant="body2" color="GrayText" mt={2} mr={22}>
          Select Date
        </Typography>
      </Grid>
      <Grid container mt={2}>
        <FormInputSelect
          name="visitType"
          label="Select Visit Type"
          data={visitTypes}
          control={control}
          register={register}
          errors={errors}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormInputDate
            id="date-and-time"
            name="appointmentDate"
            label="Select Date"
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
          control={control}
          register={register}
          errors={errors}
        />
        <FormInputText
          id="note"
          name="note"
          label="Brief reason for appointment"
          register={register}
          errors={errors}
        />
      </Grid>
    </>
  )
}
