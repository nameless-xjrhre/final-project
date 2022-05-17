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
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useQuery, gql } from 'urql'
import './index.css'

interface Appointment {
  id: number
  visitType: string
  date: Date
  status: string
  patient: {
    fullName: string
  }
  medStaff: {
    fullName: string
  }
}

interface AppointmentQuery {
  appointments: Appointment[]
}

const appointmentQueryDocument = gql`
  query appointmentQuery {
    appointments {
      id
      visitType
      date
      status
      patient {
        fullName
      }
      medStaff {
        fullName
      }
    }
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f4f4f4',
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#52575C',
  },
  fontFamily: `'Lato', sans-serif`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

export default function AppointmentList() {
  const [appointment] = useQuery<AppointmentQuery>({
    query: appointmentQueryDocument,
  })

  const { data, fetching, error } = appointment
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
            {Array.from({ length: 5 }).map(() => (
              <TableRow>
                {Array.from({ length: 8 }).map(() => (
                  <StyledTableCell>
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
              data.appointments.map((item) => (
                <TableRow key={item.id}>
                  <StyledTableCell>Dr. {item.patient.fullName}</StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" spacing={0.5}>
                      <Chip
                        label="9:00 - 12:00"
                        color="success"
                        size="small"
                        sx={{
                          borderRadius: 1,
                        }}
                      />
                      <Chip
                        label="13:00 - 17:00"
                        color="error"
                        size="small"
                        sx={{
                          borderRadius: 1,
                        }}
                      />
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                  <StyledTableCell>d</StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
