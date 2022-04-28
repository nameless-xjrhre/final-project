import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useQuery, gql } from 'urql'
import PatientForm from '../PatientForm'

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

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function PatientsList() {
  const [patients] = useQuery<Patient>({
    query: patientQueryDocument,
  })

  const { data, fetching, error } = patients
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
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
          {data &&
            data.patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>May 9</TableCell>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell>{patient.contactNum}</TableCell>
                <TableCell>Check Up</TableCell>
                <TableCell>Dr. Ralph</TableCell>
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
