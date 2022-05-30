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

const currentDate = new Date()

const daysOftheWeek: { [key: string]: number } = {
  Su: 0,
  M: 1,
  T: 2,
  W: 3,
  Th: 4,
  F: 5,
  Sa: 6,
}

const firstDayOfTheWeek = currentDate.getDate() - currentDate.getDay()

const getDay = (day: string) => firstDayOfTheWeek + daysOftheWeek[day]

const setScheduleDate = (date: Date, day: string) =>
  new Date(
    date.setFullYear(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      getDay(day),
    ),
  )

const getCompleteDate = (time: string, day: string) => {
  const hour = new Date(time).getHours()
  const min = new Date(time).getMinutes()

  return new Date(new Date(setScheduleDate(new Date(), day))).setHours(
    hour,
    min,
  )
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
      startTime: new Date(getCompleteDate(data.startTime, day)),
      endTime: new Date(getCompleteDate(data.endTime, day)),
    }))
    const inputs: MutationCreateSchedulesArgs = {
      data: dateInputs,
    }
    handleSubmitting()
    createSchedules(inputs)
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
        Create Schedule
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
