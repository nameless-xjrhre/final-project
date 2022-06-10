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
import { Button, Pagination, Typography, CircularProgress } from '@mui/material'
import { useQuery, gql, useMutation } from 'urql'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { TextField } from '@mui/material'
import CreateBillForm from '../BillForm/CreateBillForm'
import StatusButton from '../Buttons/StatusButton'
import {
  AppointmentStatus,
  MutationEditAppointmentArgs,
  VisitType,
} from '../../graphql/generated'
import { capitalize, showFailAlert, showSuccessAlert } from '../../utils'
import CreateAppointmentForm from '../AppointmentForm/CreateAppointmentForm'
import DeleteAppointmentDialog from '../AppointmentForm/DeleteAppointmentDialog'

const appointmentStatus = [
  AppointmentStatus.Canceled,
  AppointmentStatus.Done,
  AppointmentStatus.Expired,
  AppointmentStatus.Pending,
]

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

const defaultAppointment: Appointment = {
  id: 0,
  date: new Date(),
  medStaff: {
    fullName: '',
    id: 0,
  },
  note: '',
  patient: {
    fullName: '',
    id: 0,
  },
  status: AppointmentStatus.Pending,
  visitType: VisitType.Followup,
}

export default function AppointmentList() {
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null)
  const [statusDrop, setStatusDropDown] = React.useState<null | HTMLElement>(
    null,
  )
  const [page, setPage] = React.useState(1)
  const open = Boolean(drop)
  const openStatus = Boolean(statusDrop)
  const handleDismissDropdown = () => setDropDown(null)
  const handleDismissStatusDropdown = () => setStatusDropDown(null)
  const [generateBillBtn, setGenerateBillBtn] = React.useState(false)
  const [filter, setFilter] = React.useState('')
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
    React.useState<Appointment>(defaultAppointment)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleSubmitting = () => setIsSubmitting(true)
  const [, setComplete] = React.useState(false)
  const handleComplete = () => {
    setIsSubmitting(false)
    setComplete(true)
    setDropDown(null)
    setStatusDropDown(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDropDown(event.currentTarget)
  }

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setStatusDropDown(event.currentTarget)
  }

  const [appointments] = useQuery<AppointmentQuery>({
    query: AppointmentQueryDocument,
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

  const handleFilter = (filterInput: any) => {
    setFilter(filterInput.target.value)
  }

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
      <TextField
        onChange={handleFilter}
        id="searchBar"
        label="Search Patient"
        variant="outlined"
        size="medium"
      />
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
            data.appointmentsRange.map(
              (appointment) =>
                appointment.patient.fullName
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .trim()
                  .includes(
                    filter.toLowerCase().replace(/\s+/g, '').trim(),
                  ) && (
                  <TableRow key={appointment.id}>
                    <StyledTableCell data-testid={`name-${appointment.id}`}>
                      {appointment.patient.fullName}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        fontWeight: '800',
                      }}
                      data-testid={`visit-type-${appointment.id}`}
                    >
                      {capitalize(appointment.visitType.toLowerCase())}
                    </StyledTableCell>
                    <StyledTableCell data-testid={`date-${appointment.id}`}>
                      {new Date(appointment.date).toLocaleDateString('en-ZA')}
                    </StyledTableCell>
                    <StyledTableCell
                      data-testid={`visit-time-${appointment.id}`}
                    >
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
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                        ) => {
                          handleStatusClick(e)
                          setCurrentAppointment(appointment)
                        }}
                      />
                      <Menu
                        anchorEl={statusDrop}
                        open={openStatus}
                        onClose={handleDismissStatusDropdown}
                      >
                        {appointmentStatus?.map((status) => (
                          <MenuItem
                            value={status}
                            key={status}
                            disabled={isSubmitting}
                            onClick={handleUpdateAppointmentStatus(
                              currentAppointment.id,
                              status,
                            )}
                          />
                        ))}
                      </Menu>
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
                        <MenuItem onClick={handleEditApptOpenForm}>
                          Edit
                        </MenuItem>
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
                ),
            )}
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
