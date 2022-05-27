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
import EditPatientForm from '../PatientForm/EditPatientForm'
import DeletePatientDialog from '../PatientForm/DeletePatientDialog'

interface Patient {
  id: number
  fullName: string
  sex: string
  firstName: string
  lastName: string
  contactNum: string
  dateOfBirth: Date
  address: string
  latestAppointment: {
    date: Date
    visitType: string
    medStaff: {
      fullName: string
    }
  }
}

interface PatientQueryData {
  patients: Patient[]
}

const patientQueryDocument = gql`
  query PatientDetails {
    patients {
      id
      fullName
      sex
      firstName
      lastName
      contactNum
      dateOfBirth
      address
      latestAppointment {
        date
        visitType
        medStaff {
          id
          fullName
        }
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
  patient.latestAppointment == null

export default function PatientsList() {
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null)
  const [editPatientBtn, setEditPatientBtn] = React.useState(false)
  const [deletePatientBtn, setDeletePatientBtn] = React.useState(false)
  const handleOpenEditForm = () => setEditPatientBtn(true)
  const handleCloseEditForm = () => setEditPatientBtn(false)
  const handleOpenDeleteForm = () => setDeletePatientBtn(true)
  const handleCloseDeleteForm = () => setDeletePatientBtn(false)
  const handleDismissDropdown = () => setDropDown(null)
  const open = Boolean(drop)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget)
  const [currenPatient, setCurrentPatient] = React.useState<Patient>()

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
                    : new Date(
                        patient?.latestAppointment?.date,
                      ).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>{patient.fullName}</StyledTableCell>
                <StyledTableCell>{patient.sex.toString()}</StyledTableCell>
                <StyledTableCell>{patient.contactNum}</StyledTableCell>
                <StyledTableCell>
                  {patient?.latestAppointment?.visitType}
                </StyledTableCell>
                <StyledTableCell>
                  {hasNoAppointments(patient)
                    ? ''
                    : `Dr. ${patient?.latestAppointment?.medStaff?.fullName}`}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {
                      handleClick(e)
                      setCurrentPatient(patient)
                    }}
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>{' '}
                  <Menu
                    id="basic-menu"
                    anchorEl={drop}
                    open={open}
                    onClose={handleDismissDropdown}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleOpenEditForm}>Edit</MenuItem>
                    {editPatientBtn && (
                      <EditPatientForm
                        handleClose={handleCloseEditForm}
                        open={editPatientBtn}
                        patient={currenPatient}
                      />
                    )}
                    <MenuItem onClick={handleDismissDropdown}>
                      View Details
                    </MenuItem>
                    <MenuItem
                      onClick={handleOpenDeleteForm}
                      sx={{ color: 'red' }}
                    >
                      Delete
                    </MenuItem>
                    {deletePatientBtn && (
                      <DeletePatientDialog
                        handleClose={handleCloseDeleteForm}
                        open={deletePatientBtn}
                        patient={currenPatient}
                      />
                    )}
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
