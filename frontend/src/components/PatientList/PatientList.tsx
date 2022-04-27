import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PatientForm from '../PatientForm'

// Generate Order Data
function createData(
  lastVisit: string,
  name: string,
  gender: string,
  contactNum: string,
  visitType: string,
  doctor: string,
) {
  return {
    lastVisit,
    name,
    gender,
    contactNum,
    visitType,
    doctor,
  }
}

const rows = [
  // createData example
  createData(
    '01/04/22',
    'Ronald Richards',
    'Male',
    '0123456789',
    'Doctor Visit',
    'Dr. Theresa Web',
  ),
  createData(
    '01/04/22',
    'Ronald Richards',
    'Male',
    '0123456789',
    'Doctor Visit',
    'Dr. Theresa Web',
  ),
  createData(
    '01/04/22',
    'Ronald Richards',
    'Male',
    '0123456789',
    'Doctor Visit',
    'Dr. Theresa Web',
  ),
  createData(
    '01/04/22',
    'Ronald Richards',
    'Male',
    '0123456789',
    'Doctor Visit',
    'Dr. Theresa Web',
  ),
  createData(
    '01/04/22',
    'Ronald Richards',
    'Male',
    '0123456789',
    'Doctor Visit',
    'Dr. Theresa Web',
  ),
]

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function PatientsList() {
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Last Visited</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Visit Type</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.lastVisit}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.contactNum}</TableCell>
              <TableCell>{row.visitType}</TableCell>
              <TableCell>{row.doctor}</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      <PatientForm />
    </>
  )
}
