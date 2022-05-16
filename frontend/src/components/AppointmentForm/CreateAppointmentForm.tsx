import { Grid, Typography, IconButton, Divider, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import AppointmentForm from './AppointmentForm'

const appointmentSchema = object().shape({
  visitType: string().required('Select type of visit.'),
  medicalStaff: string().required('Select preferred doctor.'),
  appointmentDate: string().nullable().required('Select appointment date.'),
  note: string().required('Provide reason for appointment.'),
})

export default function CreateAppointmentForm({
  open,
  handleClose,
}: CustomFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  })

  const handleCreateAppointment = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Create Appointment
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
      <AppointmentForm control={control} register={register} errors={errors} />
      <Button
        onClick={handleCreateAppointment}
        variant="contained"
        sx={{
          background: '#336CFB',
          display: 'block',
          marginLeft: 'auto',
        }}
      >
        Book Now
      </Button>
    </CustomForm>
  )
}
