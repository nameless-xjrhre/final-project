/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import { Menu, MenuItem, Pagination, CircularProgress } from '@mui/material'
import { useQuery, useMutation, gql } from 'urql'
import Typography from '@mui/material/Typography'
import {
  AppointmentStatus,
  MutationEditAppointmentArgs,
  VisitType,
} from '../../graphql/generated'
import StatusButton from '../Buttons/StatusButton'
import { showFailAlert, showSuccessAlert } from '../../utils'

const appointmentStatus = [
  AppointmentStatus.Canceled,
  AppointmentStatus.Done,
  AppointmentStatus.Expired,
  AppointmentStatus.Pending,
]

interface Appointment {
  id: number
  visitType: VisitType
  date: Date
  status: AppointmentStatus
  patient: {
    id: number
    fullName: string
  }
  medStaff: {
    id: number
    fullName: string
  }
}

interface AppointmentQuery {
  appointmentsRange: Appointment[]
  totalAppointments: number
}

const AppointmentsQueryDocument = gql`
  query Appointments($start: Int!, $count: Int!) {
    appointmentsRange(start: $start, count: $count) {
      id
      visitType
      date
      status
      patient {
        id
        fullName
      }
      medStaff {
        id
        fullName
      }
    }
    totalAppointments
  }
`

const UpdateAppointmentStatus = gql`
  mutation UpdateAppointmentStatus($id: Int!, $data: EditAppointmentInput!) {
    editAppointment(id: $id, data: $data) {
      id
      date
      status
      patient {
        fullName
      }
    }
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fff',
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
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null)
  const open = Boolean(drop)
  const [ID, setID] = React.useState<number>()
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    idNum: number,
  ) => {
    setID(idNum)
    setDropDown(event.currentTarget)
  }
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleSubmitting = () => setIsSubmitting(true)
  const [page, setPage] = React.useState(1)
  const handleClose = () => setDropDown(null)
  const [, setComplete] = React.useState(false)
  const handleComplete = () => {
    setIsSubmitting(false)
    setComplete(true)
    setDropDown(null)
  }
  const [appointments] = useQuery<AppointmentQuery>({
    query: AppointmentsQueryDocument,
    variables: {
      start: (page - 1) * 10,
      count: 10,
    },
  })
  const [, updateStatus] = useMutation(UpdateAppointmentStatus)

  const handleUpdateAppointmentStatus =
    (id: number, status: AppointmentStatus) => () => {
      const input: MutationEditAppointmentArgs = {
        id,
        data: {
          status,
        },
      }
      handleSubmitting()
      updateStatus(input)
        .then((result) => {
          if (result.error) {
            handleComplete()
            showFailAlert('')
          } else {
            handleComplete()
            showSuccessAlert('')
          }
        })
        .catch((err) => console.error(err))
    }

  const { data, fetching, error } = appointments
  if (fetching)
    return (
      <>
        <Typography
          sx={{ flex: '1 1 100%', mt: 3, mb: 3, ml: 2, fontSize: 25 }}
          variant="h6"
          id="tableTitle"
          component="div"
          fontWeight="bold"
        >
          Appointment Activity
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient</StyledTableCell>
              <StyledTableCell>Visit Type</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Visit Time</StyledTableCell>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((__, j) => (
                  <StyledTableCell key={j}>
                    <Skeleton variant="text" />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <>
      <Typography
        sx={{ flex: '1 1 100%', mt: 3, mb: 3, ml: 2, fontSize: 25 }}
        variant="h6"
        id="tableTitle"
        component="div"
        fontWeight="bold"
      >
        Appointment Activity
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient</StyledTableCell>
            <StyledTableCell>Visit Type</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Visit Time</StyledTableCell>
            <StyledTableCell>Doctor</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.appointmentsRange.map((appointment) => (
              <TableRow key={appointment.id}>
                <StyledTableCell data-testid={`name-${appointment.id}`}>
                  {appointment.patient.fullName}
                </StyledTableCell>
                <StyledTableCell data-testid={`visit-type-${appointment.id}`}>
                  {appointment.visitType}
                </StyledTableCell>
                <StyledTableCell data-testid={`date-${appointment.id}`}>
                  {new Date(appointment.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell data-testid={`visit-time-${appointment.id}`}>
                  {new Date(appointment.date).toLocaleTimeString('en-US', {
                    hour12: false,
                  })}
                </StyledTableCell>
                <StyledTableCell data-testid={`doctor-${appointment.id}`}>
                  Dr. {appointment.medStaff.fullName}
                </StyledTableCell>
                <StyledTableCell data-testid={`status-${appointment.id}`}>
                  <StatusButton
                    status={appointment.status}
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                    ) => handleClick(e, appointment.id)}
                  />
                  <Menu anchorEl={drop} open={open} onClose={handleClose}>
                    {appointmentStatus?.map((status) => (
                      <MenuItem
                        value={status}
                        key={status}
                        disabled={isSubmitting}
                        onClick={handleUpdateAppointmentStatus(ID!, status)}
                      >
                        {status}
                      </MenuItem>
                    ))}
                    {isSubmitting && (
                      <CircularProgress
                        size={25}
                        sx={{
                          color: 'blue',
                          marginLeft: 5,
                          marginTop: -10,
                          position: 'absolute',
                        }}
                      />
                    )}
                  </Menu>
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        count={data ? Math.ceil(data.totalAppointments / 10) : 0}
        onChange={(_, pageNum) => {
          setPage(pageNum)
        }}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{
          my: 2,
          ml: 1,
        }}
      />
    </>
  )
}
