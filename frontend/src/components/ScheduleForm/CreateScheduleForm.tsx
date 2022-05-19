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
  MutationCreateScheduleArgs,
  ScheduleStatus,
} from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

const scheduleSchema = object().shape({
  medicalStaff: string().required('Select preferred doctor.'),
  startTime: string().nullable().required('Select start time.'),
  endTime: string().nullable().required('Select end time.'),
})

const CreateSchedule = gql`
  mutation CreateSchedule($data: CreateScheduleInput!) {
    createSchedule(data: $data) {
      id
      startTime
      endTime
      medStaff {
        id
      }
      status
    }
  }
`

const getDate = (time: string) => {
  const hour = parseInt(time.split(':')[0], 10)
  const min = parseInt(time.split(':')[1], 10)
  const today = new Date()

  return new Date(today.setHours(hour, min))
}

export default function CreateScheduleForm({
  open,
  handleClose,
}: CustomFormProps) {
  const [, createSchedule] = useMutation(CreateSchedule)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
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
    resolver: yupResolver(scheduleSchema),
  })

  const handleCreateSchedule = handleSubmit((data) => {
    const input: MutationCreateScheduleArgs = {
      data: {
        medStaffId: parseInt(data.medicalStaff, 10),
        status: ScheduleStatus.Open,
        startTime: getDate(data.startTime),
        endTime: getDate(data.endTime),
      },
    }

    handleSubmitting()
    createSchedule(input)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert()
        } else {
          console.log(result)
          handleClose(handleComplete)
          showSuccessAlert()
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
      <ScheduleForm control={control} register={register} errors={errors} />
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
