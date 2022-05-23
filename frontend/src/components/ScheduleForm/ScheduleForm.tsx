import React from 'react'
import { Typography, Grid } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { useQuery } from 'urql'
import Select from 'react-select'
import { FormInputTime, FormInputSelectMedStaff } from './FormInputFields'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
} from './FormInputProps'

export interface FormValue {
  readonly value: string
  readonly label: string
}

export const daysSchedule: FormValue[] = [
  { value: 'M', label: 'Mon' },
  { value: 'T', label: 'Tue' },
  { value: 'W', label: 'Wed' },
  { value: 'Th', label: 'Thu' },
  { value: 'F', label: 'Fri' },
  { value: 'Sa', label: 'Sat' },
  { value: 'Su', label: 'Sun' },
]

interface CreateAppointmentFormProps {
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
  days: string[]
  setDays: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ScheduleForm({
  control,
  register,
  errors,
  days,
  setDays,
}: CreateAppointmentFormProps) {
  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })
  return (
    <>
      <Grid container mt={2}>
        <Grid>
          <Typography variant="body2" color="GrayText">
            Select Doctor
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
      </Grid>
      <Grid>
        <Typography variant="body2" color="GrayText" mt={2}>
          Select Days
        </Typography>
        <Select
          closeMenuOnSelect={false}
          value={daysSchedule.filter((day) => days.includes(day.value))}
          options={daysSchedule}
          onChange={(e) =>
            setDays(Array.isArray(e) ? e.map((x) => x.value) : [])
          }
          isMulti
          isClearable
        />
      </Grid>

      <Grid container mt={2}>
        <Grid>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Select Start Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormInputTime
              name="startTime"
              errors={errors}
              register={register}
              control={control}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Select End Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormInputTime
              name="endTime"
              errors={errors}
              register={register}
              control={control}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  )
}
