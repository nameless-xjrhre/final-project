import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { useQuery } from 'urql'
import {
  FormInputText,
  FormInputDate,
  FormInputSelect,
  FormInputSelectMedStaff,
} from './FormInpuFields'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
} from './FormInputProps'

interface CreateAppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
}

const visitTypes = [
  'Analysis',
  'Doctor Visit',
  'Examine',
  'First Aid',
  'Operation',
]

export default function AppointmentForm({
  control,
  register,
  errors,
}: CreateAppointmentFormProps) {
  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })

  const { data } = medicalStaff
  return (
    <>
      <Grid container>
        <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
          Select Service
        </Typography>
        <Typography variant="body2" color="GrayText" mt={2} mr={22}>
          Select Date
        </Typography>
      </Grid>
      <Grid container mt={3}>
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
        <FormInputSelectMedStaff
          name="medicalStaff"
          label="Select Doctor"
          data={data!}
          control={control}
          register={register}
          errors={errors}
        />
      </Grid>
      <Grid container>
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
