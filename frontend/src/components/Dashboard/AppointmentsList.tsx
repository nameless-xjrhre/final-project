/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import { Pagination } from '@mui/material'
import { useQuery, useMutation, gql } from 'urql'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import { AppointmentStatus } from '../../graphql/generated'
import StatusButton from '../Buttons/StatusButton'
import { showFailAlert, showSuccessAlert } from '../../utils'

interface Appointment {
  id: number
  visitType: string
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

const CancelAppointmentMutationDocument = gql`
  mutation CancelAppointment($id: Int!) {
    editAppointment(id: $id, data: { status: CANCELED }) {
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
  const [, setDropDown] = React.useState<null | HTMLElement>(null)
  const [page, setPage] = React.useState(1)
  const handleClose = () => {
    setDropDown(null)
  }
  const [appointment] = useQuery<AppointmentQuery>({
    query: AppointmentsQueryDocument,
    variables: {
      start: (page - 1) * 10,
      count: 10,
    },
  })
  const [, cancelAppointment] = useMutation(CancelAppointmentMutationDocument)

  const handleCancel = (id: number) => () => {
    cancelAppointment({ id })
      .then((result) => {
        if (result.error) {
          showFailAlert()
        } else {
          showSuccessAlert()
        }
      })
      .then(handleClose)
      .catch((err) => console.error(err))
  }

  const { data, fetching, error } = appointment
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
            data.appointmentsRange.map((item) => (
              <TableRow key={item.id}>
                <StyledTableCell>{item.patient.fullName}</StyledTableCell>
                <StyledTableCell>{item.visitType}</StyledTableCell>
                <StyledTableCell>
                  {new Date(item.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(item.date).toLocaleTimeString('en-US', {
                    hour12: false,
                  })}
                </StyledTableCell>
                <StyledTableCell>Dr. {item.medStaff.fullName}</StyledTableCell>
                <StyledTableCell>
                  <StatusButton status={item.status} />
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    id="basic-button"
                    aria-haspopup="true"
                    style={{ color: '#808080' }}
                  >
                    <Tooltip title="Cancel Appointment">
                      <CancelIcon
                        color="error"
                        onClick={handleCancel(item.id)}
                      />
                    </Tooltip>
                  </Button>{' '}
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
