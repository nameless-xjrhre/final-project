import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { useQuery } from 'urql'
import { ScheduleStatus } from '../../graphql/generated'
import {
  FormInputDate,
  FormInputSelectMedStaff,
  FormInputSelect,
} from './FormInputFields'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
} from './FormInputProps'

interface CreateAppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}

const scheduleTypes = [
  ScheduleStatus.Closed,
  ScheduleStatus.Done,
  ScheduleStatus.NotAvailable,
  ScheduleStatus.Open,
]

export default function ScheduleForm({
  control,
  register,
  errors,
}: CreateAppointmentFormProps) {
  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })

  return (
    <>
      <Grid container mt={2}>
        <Grid>
          <Typography variant="body2" color="GrayText">
            Select Medical Staff
          </Typography>
          <FormInputSelectMedStaff
            name="medicalStaff"
            label="Select Doctor"
            data={medicalStaff.data!}
            control={control}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid>
          <Typography variant="body2" color="GrayText">
            Select Schedule Status
          </Typography>
          <FormInputSelect
            name="scheduleType"
            label="Select Schedule Type"
            data={scheduleTypes}
            control={control}
            register={register}
            errors={errors}
          />
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Select Start Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormInputDate
              id="date-and-time"
              name="startTimeDate"
              label="Select Start Time"
              control={control}
              register={register}
              errors={errors}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Select Start Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormInputDate
              id="date-and-time"
              name="endTimeDate"
              label="Select End Time"
              control={control}
              register={register}
              errors={errors}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  )
}
