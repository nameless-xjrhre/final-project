import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import { Button } from '@mui/material'
import { useQuery, gql, useMutation } from 'urql'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { BillStatus } from '../../graphql/generated'
import CreateBillForm from '../BillForm/CreateBillForm'
import { showFailAlert, showSuccessAlert } from '../../utils'
import useStore from '../../store'

interface Bill {
  id: number
  date: Date
  amount: number
  status: BillStatus
  deadlineDate: Date
  patient: {
    id: number
    fullName: string
  }
  medStaff: {
    id: number
    fullName: string
  }
}

interface BillQueryData {
  hospitalBills: Bill[]
}

const billQueryDocument = gql`
  query HospitalBills {
    hospitalBills {
      id
      date
      amount
      status
      deadlineDate
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

const UpdatStatusBill = gql`
  mutation MarkAsPaidBill($id: Int!) {
    editHospitalBill(id: $id, data: { status: PAID }) {
      id
      status
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
  const [editBilltBtn, setEditBillBtn] = React.useState(false)
  const handleDismissDropdown = () => setDropDown(null)
  const handleOpenEditBillForm = () => setEditBillBtn(true)
  const handleCloseEditBillForm = () => {
    setEditBillBtn(false)
    handleDismissDropdown()
  }
  const [currentBill, setCurrentBill] = React.useState<Bill>()
  const open = Boolean(drop)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget)
  const [bills] = useQuery<BillQueryData>({
    query: billQueryDocument,
  })

  const { billsSearch } = useStore()

  const [, markAsPaid] = useMutation(UpdatStatusBill)

  const handleBillStatusUpdate = (id: number | undefined) => () => {
    markAsPaid({ id })
      .then((result) => {
        if (result.error) {
          showFailAlert('')
        } else {
          showSuccessAlert('')
        }
      })
      .catch((err) => console.error(err))
    handleDismissDropdown()
  }

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
            <StyledTableCell>Due Date</StyledTableCell>
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
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Payment Date</StyledTableCell>
          <StyledTableCell>Amount</StyledTableCell>
          <StyledTableCell>Doctor</StyledTableCell>
          <StyledTableCell>Due Date</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
          <StyledTableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.hospitalBills.map(
            (bill) =>
              bill.patient.fullName
                .toLowerCase()
                .includes(billsSearch.toLowerCase()) && (
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
                  <StyledTableCell>{bill.medStaff.fullName}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(bill.deadlineDate).toLocaleDateString('en-ZA')}
                  </StyledTableCell>
                  <StyledTableCell>{bill.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => {
                        handleClick(e)
                        setCurrentBill(bill)
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
                      <MenuItem onClick={handleOpenEditBillForm}>Edit</MenuItem>
                      {editBilltBtn && (
                        <CreateBillForm
                          handleClose={handleCloseEditBillForm}
                          open={editBilltBtn}
                          bill={currentBill}
                          toUpdate
                        />
                      )}
                      <MenuItem
                        onClick={handleBillStatusUpdate(currentBill?.id)}
                      >
                        Mark as Paid
                      </MenuItem>
                    </Menu>
                  </StyledTableCell>
                </TableRow>
              ),
          )}
      </TableBody>
    </Table>
  )
}
