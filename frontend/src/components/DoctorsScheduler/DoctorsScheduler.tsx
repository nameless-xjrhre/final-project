/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import { useQuery, gql } from 'urql'
import './index.css'

import ScheduleStack from './ScheduleStack'
import { ScheduleStatus } from '../../graphql/generated'

interface Schedule {
  startTime: Date
  endTime: Date
  status: string
}

interface MedicalStaff {
  id: number
  fullName: string
  schedules: Schedule[]
  status: ScheduleStatus
}

interface MedicalStaffQuery {
  medicalStaff: MedicalStaff[]
}

const medicalStaffQuery = gql`
  query medicalStaffsQuery {
    medicalStaff {
      id
      fullName
      schedules {
        startTime
        endTime
        status
      }
    }
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f4f4f4',
    color: '#828080',
    fontWeight: 'Regular',
    fontSize: '1em',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#52575C',
  },
  fontFamily: `'Lato', sans-serif`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

function validScheduleForDay(time: Date, day: number) {
  return time.getDay() === day
}

function validTimeIntervalForWeek(startTime: Date, endTime: Date, day: number) {
  return (
    validScheduleForDay(startTime, day) && validScheduleForDay(endTime, day)
  )
}

export default function DoctorsScheduler() {
  const [medicalStaffs] = useQuery<MedicalStaffQuery>({
    query: medicalStaffQuery,
  })

  const { data, fetching, error } = medicalStaffs
  console.log(data)
  if (fetching)
    return (
      <div className="scheduler">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Monday</StyledTableCell>
              <StyledTableCell>Tuesday</StyledTableCell>
              <StyledTableCell>Wednesday</StyledTableCell>
              <StyledTableCell>Thursday</StyledTableCell>
              <StyledTableCell>Friday</StyledTableCell>
              <StyledTableCell>Saturday</StyledTableCell>
              <StyledTableCell>Sunday</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 8 }).map((__, j) => (
                  <StyledTableCell key={j}>
                    <Skeleton variant="text" />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <div className="scheduler">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Monday</StyledTableCell>
              <StyledTableCell>Tuesday</StyledTableCell>
              <StyledTableCell>Wednesday</StyledTableCell>
              <StyledTableCell>Thursday</StyledTableCell>
              <StyledTableCell>Friday</StyledTableCell>
              <StyledTableCell>Saturday</StyledTableCell>
              <StyledTableCell>Sunday</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.medicalStaff.map((medStaff: MedicalStaff) => {
                const { id, fullName, schedules } = medStaff
                return (
                  <TableRow key={id}>
                    <StyledTableCell>Dr. {fullName}</StyledTableCell>
                    {Array.from({ length: 7 }).map((_, i) => {
                      // filter out schedules that are not the same day of the week
                      const day = i < 6 ? i + 1 : 0
                      const validSchedules = schedules.filter((schedule) =>
                        validTimeIntervalForWeek(
                          new Date(schedule.startTime),
                          new Date(schedule.endTime),
                          day,
                        ),
                      )
                      // if there are no valid schedules, return a skeleton
                      if (validSchedules.length === 0) {
                        return <StyledTableCell key={i} />
                      }
                      // if there are valid schedules, return a schedule stack
                      return (
                        <StyledTableCell key={i}>
                          <ScheduleStack schedules={validSchedules} />
                        </StyledTableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
