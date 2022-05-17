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
  const handleOpenBillForm = () => setGenerateBillBtn(true)
  const handleCloseBillForm = () => setGenerateBillBtn(false)
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
                <StyledTableCell>{item.status}</StyledTableCell>
                <StyledTableCell>
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
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>View Notes</MenuItem>
                    <MenuItem onClick={handleOpenBillForm}>
                      Generate Bill
                    </MenuItem>
                    {generateBillBtn && (
                      <AddBillForm
                        handleClose={handleCloseBillForm}
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
