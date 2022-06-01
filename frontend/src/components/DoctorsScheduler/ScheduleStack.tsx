/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Menu, MenuItem, Chip, Stack, CircularProgress } from '@mui/material'
import { gql, useMutation } from 'urql'
import {
  MutationEditScheduleArgs,
  ScheduleStatus,
} from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

const scheduleStatus = [
  ScheduleStatus.Open,
  ScheduleStatus.Closed,
  ScheduleStatus.NotAvailable,
]

interface Schedule {
  id: number
  startTime: Date
  endTime: Date
  status: ScheduleStatus
}
interface ScheduleStackProps {
  schedules: Schedule[]
}

enum ChipColors {
  success = '#57E799',
  error = '#FE7981',
  warning = '#F2E462',
  info = '#CBCBCB',
}

function getChipColor(status: string) {
  switch (status) {
    case ScheduleStatus.Done:
      return ChipColors.warning
    case ScheduleStatus.Closed:
      return ChipColors.error
    case ScheduleStatus.NotAvailable:
      return ChipColors.info
    case ScheduleStatus.Open:
      return ChipColors.success
    default:
      return ChipColors.warning
  }
}

const UpdateScheduleStatus = gql`
  mutation UpdateScheduleStatus($id: Int!, $data: EditScheduleInput!) {
    editSchedule(id: $id, data: $data) {
      id
      status
    }
  }
`

export default function ScheduleStack(props: ScheduleStackProps) {
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null)
  const open = Boolean(drop)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setDropDown(event.currentTarget)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [, setComplete] = React.useState(false)
  const handleComplete = () => {
    setIsSubmitting(false)
    setComplete(true)
    setDropDown(null)
  }
  const handleSubmitting = () => setIsSubmitting(true)
  const [, updateStatus] = useMutation(UpdateScheduleStatus)

  const handleUpdateScheduleStatus =
    (id: number, status: ScheduleStatus) => () => {
      const input: MutationEditScheduleArgs = {
        id,
        data: {
          status,
        },
      }
      handleSubmitting()
      updateStatus(input)
        .then((result) => {
          if (result.error) {
            console.log(result)
            handleComplete()
            showFailAlert('')
          } else {
            console.log(result)
            handleComplete()
            showSuccessAlert('')
          }
        })
        .catch((err) => console.error(err))
    }

  const { schedules } = props
  return (
    <Stack direction="column" spacing={0.5}>
      {schedules.map((schedule, index) => (
        <>
          <Chip
            onClick={handleClick}
            key={index}
            label={`${new Date(schedule.startTime).toLocaleTimeString([], {
              timeStyle: 'short',
            })} - ${new Date(schedule.endTime).toLocaleTimeString([], {
              timeStyle: 'short',
            })}`}
            sx={{
              borderRadius: 1,
              backgroundColor: getChipColor(schedule.status),
            }}
          />
          <Menu anchorEl={drop} open={open} onClose={() => setDropDown(null)}>
            {scheduleStatus?.map((status) => (
              <MenuItem
                value={status}
                key={status}
                disabled={isSubmitting}
                onClick={handleUpdateScheduleStatus(schedule.id, status)}
              >
                {status}
              </MenuItem>
            ))}
            {isSubmitting && (
              <CircularProgress
                size={25}
                sx={{
                  color: 'blue',
                  marginLeft: 8,
                  marginTop: -8,
                  position: 'absolute',
                }}
              />
            )}
          </Menu>
        </>
      ))}
    </Stack>
  )
}
