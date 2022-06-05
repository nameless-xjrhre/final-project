import React, { useState } from 'react'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, gql } from 'urql'
import CustomForm from '../CustomForm'
import { AppointmentFormProps } from '../CustomFormProps'
import { showFailAlert, showSuccessAlert } from '../../utils'

const DeleteAppointment = gql`
  mutation DeleteAppointment($id: Int!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`

export default function DeleteAppointmentDialog({
  handleClose,
  open,
  appointment,
}: AppointmentFormProps) {
  const [, deleteAppointment] = useMutation(DeleteAppointment)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)

  const rightButtonSx = {
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

  const lefButtonSx = {
    ...(complete && {
      bgcolor: '#336CFB',
      '&:hover': {
        bgcolor: '#336CFB',
      },
    }),
    display: 'block',
    marginTop: 3,
    marginRight: 'auto',
  }
  const handleDeleteAppointment = () => {
    const appointmentId = {
      id: appointment?.id,
    }

    handleSubmitting()
    deleteAppointment(appointmentId)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert('Unsuccessful operation.')
        } else {
          handleClose(handleComplete)
          showSuccessAlert('Succesfully deleted appointment.')
        }
      })
      .catch((err) => console.error(err))
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleDeleteAppointment()
  }
  return (
    <CustomForm open={open}>
      <Grid container>
        <IconButton
          sx={{ marginLeft: 'auto' }}
          aria-label="close"
          onClick={(e) => {
            handleClose(e)
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Typography variant="h6" color="GrayText" mt={3} align="center">
        Are you sure you want to delete this appointment?
      </Typography>
      <Grid container mt={5}>
        <Button
          variant="contained"
          disabled={isSubmitting}
          sx={lefButtonSx}
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          variant="contained"
          disabled={isSubmitting}
          sx={rightButtonSx}
          onClick={(e) => handleDelete(e)}
        >
          Yes
        </Button>
      </Grid>
    </CustomForm>
  )
}
