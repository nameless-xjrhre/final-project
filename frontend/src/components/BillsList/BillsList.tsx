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
import DeletePatientForm from '../PatientForm/DeletePatientForm'
import { BillStatus } from '../../graphql/generated'

interface Bill {
  id: number
  date: Date
  amount: number
  status: BillStatus
  patient: {
    id: number
    fullName: string
  }
}

interface BillQueryData {
  hospitalBills: Bill[]
}

const billQueryDocument = gql`
  query {
    hospitalBills {
      id
      date
      amount
      status
      patient {
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

export default function BillsList() {
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

  const [bills] = useQuery<BillQueryData>({
    query: billQueryDocument,
  })

  const { data, fetching, error } = bills
  if (fetching)
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Payment Date</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
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
            <StyledTableCell>Payment Date</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Doctor</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.hospitalBills.map((bill) => (
              <TableRow key={bill.id}>
                <StyledTableCell>
                  {bill.patient !== null ? bill.patient.fullName : ''}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(bill.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  <strong>₱ {bill.amount.toFixed(2)}</strong>
                </StyledTableCell>
                <StyledTableCell>Dr. Cruz</StyledTableCell>
                <StyledTableCell>{bill.status}</StyledTableCell>
                <StyledTableCell align="right">
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
                      />
                    )}
                    <MenuItem onClick={handleDismissDropdown}>
                      View Details
                    </MenuItem>
                    <MenuItem onClick={handleOpenDeleteForm}>Delete</MenuItem>
                    {deletePatientBtn && (
                      <DeletePatientForm
                        handleClose={handleCloseDeleteForm}
                        open={deletePatientBtn}
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
