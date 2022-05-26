import * as React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CircleIcon from '@mui/icons-material/Circle'
import { AppointmentStatus } from '../../graphql/generated'

import './index.css'

interface StatusButtonProps {
  status: AppointmentStatus
}

const statusToColor = {
  [AppointmentStatus.Canceled]: '#FFE5E5',
  [AppointmentStatus.Done]: '#F0FFE9',
  [AppointmentStatus.Expired]: '#FFF5E9',
  [AppointmentStatus.Pending]: '#BCD4F8',
}

const statusToIcon = {
  [AppointmentStatus.Canceled]: (
    <CircleIcon
      style={{
        color: '#F86F6F',
      }}
    />
  ),
  [AppointmentStatus.Done]: (
    <CircleIcon
      style={{
        color: '#93E171',
      }}
    />
  ),
  [AppointmentStatus.Expired]: (
    <CircleIcon
      style={{
        color: '#FEBD70',
      }}
    />
  ),
  [AppointmentStatus.Pending]: (
    <CircleIcon
      style={{
        color: '#5692EC',
      }}
    />
  ),
}

type ColorButtonProps = ButtonProps & StatusButtonProps

const ColorButton = styled(Button)<ColorButtonProps>(({ status }) => {
  const color = statusToColor[status]
  return {
    color: '#676868',
    backgroundColor: color,
    '&:hover': {
      backgroundColor: color,
    },
    textTransform: 'capitalize',
    width: '90%',
  }
})

export default function StatusButton({ status }: StatusButtonProps) {
  const icon = statusToIcon[status]
  return (
    <ColorButton
      className="button-text"
      status={status}
      variant="contained"
      disableElevation
      startIcon={icon}
      sx={{
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      {status.toLowerCase()}
    </ColorButton>
  )
}
