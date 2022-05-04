import React from 'react'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CustomForm from '../CustomForm'
import PatientFormProps from './PatientFormsProps'

export default function DeletePatientForm({
  handleClose,
  open,
}: PatientFormProps) {
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
        Are you sure you want to delete this patient?
      </Typography>
      <Grid container mt={5}>
        <Button
          variant="contained"
          sx={{
            background: '#336CFB',
            color: 'white',
          }}
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          variant="contained"
          sx={{
            background: '#336CFB',
            color: 'white',
          }}
        >
          Yes
        </Button>
      </Grid>
    </CustomForm>
  )
}
