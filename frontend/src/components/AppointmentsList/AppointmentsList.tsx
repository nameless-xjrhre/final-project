/* eslint-disable react/no-array-index-key */
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
import AddBillForm from '../BillForm/AddBillForm'
// import StatusButton from '../Buttons/StatusButton'
import { AppointmentStatus, VisitType } from '../../graphql/generated'
import { capitalize } from '../../utils'
import CreateAppointmentForm from '../AppointmentForm/CreateAppointmentForm'

interface Appointment {
  id: number
  visitType: VisitType
  date: Date
  status: AppointmentStatus
  note: string
  patient: {
    id: number
    fullName: string
  }
  medStaff: {
    id: number
    fullName: string
  }
}

export interface AppointmentQuery {
  appointments: Appointment[]
}

export const appointmentQueryDocument = gql`
  query appointmentQuery {
    appointments {
      id
      visitType
      date
      status
      note
      patient {
        id
        fullName
      }
      medStaff {
        id
        fullName
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

export default function AppointmentList() {
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null)
  const open = Boolean(drop)
  const [generateBillBtn, setGenerateBillBtn] = React.useState(false)
  const handleGenerateBillOpenForm = () => setGenerateBillBtn(true)
  const handleGenerateCloseBillForm = () => setGenerateBillBtn(false)
  const [editAppointmentBtn, setEditAppointmentBtn] = React.useState(false)
  const handleEditApptOpenForm = () => setEditAppointmentBtn(true)
  const handleEditApptCloseBillForm = () => setEditAppointmentBtn(false)
  const [appt, setAppointment] = React.useState<Appointment>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDropDown(event.currentTarget)
  }
  const handleClose = () => {
    setDropDown(null)
  }
  const [appointment] = useQuery<AppointmentQuery>({
    query: appointmentQueryDocument,
  })

  // const [page, setPage] = React.useState(0)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }

  const { data, fetching, error } = appointment
  if (fetching)
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
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
    )
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
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
            data.appointments.map((item) => (
              <TableRow key={item.id}>
                <StyledTableCell>{item.patient.fullName}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: '800',
                  }}
                >
                  {capitalize(item.visitType.toLowerCase())}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(item.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(item.date).toLocaleTimeString('en-US', {
                    hour12: false,
                  })}
                </StyledTableCell>
                <StyledTableCell>Dr. {item.medStaff.fullName}</StyledTableCell>
                <StyledTableCell>{item.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {
                      handleClick(e)
                      setAppointment(item)
                    }}
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>{' '}
                  <Menu
                    id="basic-menu"
                    anchorEl={drop}
                    open={open}
                    onClose={handleClose}
                    sx={{ boxShadow: 1 }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleEditApptOpenForm}>Edit</MenuItem>
                    {editAppointmentBtn && (
                      <CreateAppointmentForm
                        handleClose={handleEditApptCloseBillForm}
                        open={editAppointmentBtn}
                        isNewAppointment={false}
                        toUpdate
                        appointment={appt!}
                      />
                    )}
                    <MenuItem onClick={handleClose}>View Notes</MenuItem>
                    <MenuItem onClick={handleGenerateBillOpenForm}>
                      Generate Bill
                    </MenuItem>
                    {generateBillBtn && (
                      <AddBillForm
                        handleClose={handleGenerateCloseBillForm}
                        open={generateBillBtn}
                        apppointment={appt!}
                      />
                    )}
                    <MenuItem onClick={handleClose} sx={{ color: 'red' }}>
                      Cancel
                    </MenuItem>
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
