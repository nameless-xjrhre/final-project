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
import ScheduleForm from './ScheduleForm'
import {
  ScheduleStatus,
  MutationCreateSchedulesArgs,
} from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

const scheduleSchema = object().shape({
  medicalStaff: string().required('Select preferred doctor.'),
  startTime: string().nullable().required('Select start time.'),
  endTime: string().nullable().required('Select end time.'),
})

const CreateSchedules = gql`
  mutation CreateSchedules($data: [CreateScheduleInput!]!) {
    createSchedules(data: $data) {
      id
      status
      startTime
      endTime
    }
  }
`

const getDayIndex = (day: string) => {
  switch (day) {
    case 'M':
      return 0
    case 'T':
      return 1
    case 'W':
      return 2
    case 'Th':
      return 3
    case 'F':
      return 4
    case 'Sa':
      return 5
    case 'Su':
      return 6
    default:
      return 0
  }
}

const getDate = (time: string, day: string) => {
  const date = new Date(time)
  const dayIndex = getDayIndex(day)
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + dayIndex,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ).toISOString()
}

export default function CreateScheduleForm({
  open,
  handleClose,
}: CustomFormProps) {
  const [, createSchedules] = useMutation(CreateSchedules)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)
  const [days, setDays] = React.useState<string[]>([])

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
    resolver: yupResolver(scheduleSchema),
  })

  const handleCreateSchedule = handleSubmit((data) => {
    const dateInputs = days.map((day) => ({
      medStaffId: parseInt(data.medicalStaff, 10),
      status: ScheduleStatus.Open,
      startTime: getDate(data.startTime, day),
      endTime: getDate(data.endTime, day),
    }))
    const inputs: MutationCreateSchedulesArgs = {
      data: dateInputs,
    }

    console.log(inputs)

    handleSubmitting()
    createSchedules(inputs)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert('Data has not been saved.')
        } else {
          console.log(result)
          handleClose(handleComplete)
          showSuccessAlert('Data has been saved.')
        }
      })
      .catch((err) => console.error(err))
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateSchedule()
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Create Schedule
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
      <ScheduleForm
        control={control}
        register={register}
        errors={errors}
        setDays={setDays}
        days={days}
      />
      <Button
        onClick={(e) => handleSubmitForm(e)}
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
      >
        Add Schedule
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 60,
          }}
        />
      )}
    </CustomForm>
  )
}
