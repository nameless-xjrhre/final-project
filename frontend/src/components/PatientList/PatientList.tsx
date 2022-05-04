import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import { Button, Pagination } from '@mui/material'
import { useQuery, gql } from 'urql'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface PatientQueryData {
  patients: {
    id: number
    fullName: string
    sex: string
    contactNum: string
    dateOfBirth: Date
    appointments: []
  }[]
}

interface Patient {
  id: number
  fullName: string
  sex: string
  contactNum: string
  dateOfBirth: Date
  appointments: []
}

const patientQueryDocument = gql`
  query patientQuery {
    patients {
      id
      fullName
      sex
      contactNum
      dateOfBirth
      appointments {
        id
      }
    }
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E8E8E8',
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

const hasNoAppointments = (patient: Patient) =>
  patient.appointments.length === 0

export default function PatientsList() {
  const [drop, SetDropDown] = React.useState<null | HTMLElement>(null)
  const open = Boolean(drop)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    SetDropDown(event.currentTarget)
  }
  const handleClose = () => {
    SetDropDown(null)
  }

  const [patients] = useQuery<PatientQueryData>({
    query: patientQueryDocument,
  })

  const { data, fetching, error } = patients
  if (fetching)
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Last Visited</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Contact Number</StyledTableCell>
            <StyledTableCell>Visit Type</StyledTableCell>
            <StyledTableCell>Doctor</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map(() => (
            <TableRow>
              {Array.from({ length: 7 }).map(() => (
                <StyledTableCell>
                  <Skeleton variant="text" />
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Last Visited</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Contact Number</StyledTableCell>
            <StyledTableCell>Visit Type</StyledTableCell>
            <StyledTableCell>Doctor</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.patients.map((patient) => (
              <TableRow key={patient.id}>
                <StyledTableCell>
                  {hasNoAppointments(patient)
                    ? '-----'
                    : patient.dateOfBirth.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>{patient.fullName}</StyledTableCell>
                <StyledTableCell>{patient.sex.toString()}</StyledTableCell>
                <StyledTableCell>{patient.contactNum}</StyledTableCell>
                <StyledTableCell>Check Up</StyledTableCell>
                <StyledTableCell>Dr. Ralph</StyledTableCell>
                <StyledTableCell>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>{' '}
                  <Menu
                    id="basic-menu"
                    anchorEl={drop}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>View Details</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu>
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination count={3} variant="outlined" shape="rounded" />
    </>
  )
}
