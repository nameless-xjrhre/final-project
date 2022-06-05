/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { Button, Pagination, Typography } from '@mui/material'
import { useQuery, gql } from 'urql'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CreateBillForm from '../BillForm/CreateBillForm'
// import StatusButton from '../Buttons/StatusButton'
import { AppointmentStatus, VisitType } from '../../graphql/generated'
import StatusButton from '../Buttons/StatusButton'
import { capitalize } from '../../utils'
import CreateAppointmentForm from '../AppointmentForm/CreateAppointmentForm'
import DeleteAppointmentDialog from '../AppointmentForm/DeleteAppointmentDialog'

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'gray',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

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
  const handleDismissDropdown = () => setDropDown(null)
  const [generateBillBtn, setGenerateBillBtn] = React.useState(false)
  const handleGenerateBillOpenForm = () => setGenerateBillBtn(true)
  const handleGenerateCloseBillForm = () => {
    setGenerateBillBtn(false)
    handleDismissDropdown()
  }
  const [editAppointmentBtn, setEditAppointmentBtn] = React.useState(false)
  const handleEditApptOpenForm = () => setEditAppointmentBtn(true)
  const handleEditApptCloseBillForm = () => {
    setEditAppointmentBtn(false)
    handleDismissDropdown()
  }
  const [deleteAppointmentBtn, setDeleteAppointmentBtn] = React.useState(false)
  const handleOpenDeleteAppointmentDialog = () => setDeleteAppointmentBtn(true)
  const handleCloseDeleteAppointmentDialog = () => {
    setDeleteAppointmentBtn(false)
    handleDismissDropdown()
  }
  const [currentAppointment, setCurrentAppointment] =
    React.useState<Appointment>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDropDown(event.currentTarget)
  }

  const [appointments] = useQuery<AppointmentQuery>({
    query: AppointmentQueryDocument,
    variables: {
      start: (page - 1) * 10,
      count: 10,
    },
  })

  const { data, fetching, error } = appointments

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
            data.appointmentsRange.map((appointment) => (
              <TableRow key={appointment.id}>
                <StyledTableCell>
                  {appointment.patient.fullName}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: '800',
                  }}
                >
                  {capitalize(appointment.visitType.toLowerCase())}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(appointment.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(appointment.date).toLocaleTimeString('en-US', {
                    hour12: false,
                  })}
                </StyledTableCell>
                <StyledTableCell>
                  Dr. {appointment.medStaff.fullName}
                </StyledTableCell>
                <StyledTableCell>
                  <StatusButton status={appointment.status} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {
                      handleClick(e)
                      setCurrentAppointment(appointment)
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
                        appointment={currentAppointment!}
                      />
                    )}
                    <CustomTooltip
                      placement="left"
                      title={
                        <Typography color="inherit" variant="body1">
                          {currentAppointment?.note}
                        </Typography>
                      }
                    >
                      <MenuItem onClick={handleDismissDropdown}>
                        View Note
                      </MenuItem>
                    </CustomTooltip>
                    <MenuItem onClick={handleGenerateBillOpenForm}>
                      Generate Bill
                    </MenuItem>
                    {generateBillBtn && (
                      <CreateBillForm
                        handleClose={handleGenerateCloseBillForm}
                        open={generateBillBtn}
                        appointment={currentAppointment!}
                        toUpdate={false}
                      />
                    )}
                    <MenuItem
                      onClick={handleOpenDeleteAppointmentDialog}
                      sx={{ color: 'red' }}
                    >
                      Delete
                    </MenuItem>
                    {deleteAppointmentBtn && (
                      <DeleteAppointmentDialog
                        handleClose={handleCloseDeleteAppointmentDialog}
                        open={deleteAppointmentBtn}
                        appointment={currentAppointment}
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
