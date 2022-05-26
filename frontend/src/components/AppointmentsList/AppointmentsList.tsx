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
import StatusButton from '../Buttons/StatusButton'
import { AppointmentStatus } from '../../graphql/generated'
import { capitalize } from '../../utils'

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

const AppointmentQueryDocument = gql`
  query AppointmentsList($start: Int!, $count: Int!) {
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
  const [page, setPage] = React.useState(1)
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
    query: AppointmentQueryDocument,
    variables: {
      start: (page - 1) * 10,
      count: 10,
    },
  })

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
            data.appointmentsRange.map((item) => (
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
                <StyledTableCell>
                  <StatusButton status={item.status} />
                </StyledTableCell>
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
