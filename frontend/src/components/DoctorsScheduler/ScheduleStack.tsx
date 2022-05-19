/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { ScheduleStatus } from '../../graphql/generated'

interface Schedule {
  startTime: Date
  endTime: Date
  status: string
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
      return ChipColors.success
    case ScheduleStatus.Closed:
      return ChipColors.error
    case ScheduleStatus.NotAvailable:
      return ChipColors.info
    case ScheduleStatus.Open:
      return ChipColors.warning
    default:
      return ChipColors.warning
  }
}

export default function ScheduleStack(props: ScheduleStackProps) {
  const { schedules } = props
  return (
    <Stack direction="column" spacing={0.5}>
      {schedules.map((schedule, index) => (
        <Chip
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
      ))}
    </Stack>
  )
}
