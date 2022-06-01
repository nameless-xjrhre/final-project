import React, { useState } from 'react'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, gql } from 'urql'
import CustomForm from '../CustomForm'
import { ScheduleFormProps } from '../CustomFormProps'
import { showFailAlert, showSuccessAlert } from '../../utils'

const DeleteSchedule = gql`
  mutation DeleteSchedule($id: Int!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`

export default function DeleteScheduleDialog({
  handleClose,
  open,
  id,
}: ScheduleFormProps) {
  const [, deleteAppointment] = useMutation(DeleteSchedule)
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
  const handleDeleteSchedule = () => {
    handleSubmitting()
    deleteAppointment({ id })
      .then((result) => {
        if (result.error) {
          console.log(result)
          handleClose(handleComplete)
          showFailAlert('Unsuccessful operation.')
        } else {
          console.log(result)
          handleClose(handleComplete)
          showSuccessAlert('Succesfully deleted schedule.')
        }
      })
      .catch((err) => console.error(err))
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleDeleteSchedule()
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
        Are you sure you want to delete this schedule?
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
