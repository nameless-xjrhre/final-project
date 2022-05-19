import * as React from 'react'
import { Grid, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from 'urql'
import swal from 'sweetalert'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import ScheduleForm from './ScheduleForm'
import { MutationCreateScheduleArgs } from '../../graphql/generated'

const scheduleSchema = object().shape({
  medicalStaff: string().required('Select preferred doctor.'),
  status: string().required('Select type of status.'),
  startTime: string().nullable().required('Select start time date.'),
  endTime: string().nullable().required('Select end time date.'),
})

const CreateSchedule = gql`
  mutation CreateSchedule($data: CreateScheduleInput!) {
    createSchedule(data: $data) {
      id
      status
      startTime
      endTime
    }
  }
`

export default function CreateScheduleForm({
  open,
  handleClose,
}: CustomFormProps) {
  const [, createSchedule] = useMutation(CreateSchedule)

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
        medStaffId: data.medicalStaff,
        status: data.status,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    }
    console.log(data)
    console.log(input)

    createSchedule(input).then((result) => console.log(result))
  })

  const showAlert = () =>
    swal({
      title: 'Success!',
      text: 'Your data has been saved.',
      icon: 'success',
    })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateSchedule()
    handleClose(e)
    showAlert()
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
        variant="contained"
        sx={{
          background: '#336CFB',
          display: 'block',
          marginLeft: 'auto',
          marginTop: 2,
        }}
      >
        Add Schedule
      </Button>
    </CustomForm>
  )
}
