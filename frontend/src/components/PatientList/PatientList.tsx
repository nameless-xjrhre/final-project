import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TablePagination } from '@mui/material'
import { useQuery, gql } from 'urql'

interface Patient {
  patients: {
    id: number
    fullName: string
    sex: string
    contactNum: string
  }[]
}

const patientQueryDocument = gql`
  query patientQuery {
    patients {
      id
      fullName
      sex
      contactNum
      dateOfBirth
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

export default function PatientsList() {
  const [patients] = useQuery<Patient>({
    query: patientQueryDocument,
  })

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const { data, fetching, error } = patients
  if (fetching) return <p>Loading...</p>
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
                <StyledTableCell>May 9</StyledTableCell>
                <StyledTableCell>{patient.fullName}</StyledTableCell>
                <StyledTableCell>
                  {patient.sex.toLocaleLowerCase()}
                </StyledTableCell>
                <StyledTableCell>{patient.contactNum}</StyledTableCell>
                <StyledTableCell>Check Up</StyledTableCell>
                <StyledTableCell>Dr. Ralph</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 5, 10]}
        component="div"
        count={data?.patients.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
