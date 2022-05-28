import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from '@mui/material'
import { gql, useQuery } from 'urql'
import _ from 'lodash'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { HospitalBill, MedicalRecord } from '../../graphql/generated'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const PatientRecordsQuery = gql`
  query PatientRecords($id: Int!) {
    patient(id: $id) {
      id
      medicalRecords {
        date
        medStaff {
          fullName
        }
        diagnosis
        prescription
      }
      hospitalBills {
        date
        medStaff {
          fullName
        }
        appointment {
          visitType
        }
        deadlineDate
        amount
        status
      }
    }
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#8F8F8F',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  fontFamily: `'Lato', sans-serif`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    fontFamily: 'Lato',
  }
}

interface BasicTabsProps {
  patientId: number
}

export default function BasicTabs({ patientId }: BasicTabsProps) {
  const [value, setValue] = React.useState(0)
  const [patientRecords] = useQuery({
    query: PatientRecordsQuery,
    variables: { id: patientId },
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { data, fetching, error } = patientRecords

  if (fetching) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderColor: 'white' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
          >
            <Tab
              label="Medical Records"
              sx={{
                fontFamily: 'Lato',
                fontWeight: 'bold',
              }}
              {...a11yProps(0)}
            />
            <Tab
              label="Financial Records"
              sx={{
                fontFamily: 'Lato',
                fontWeight: 'bold',
              }}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Doctor</StyledTableCell>
                <StyledTableCell>Diagnosis</StyledTableCell>
                <StyledTableCell>Prescription</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Payment Date</StyledTableCell>
                <StyledTableCell>Staff</StyledTableCell>
                <StyledTableCell>Visit Type </StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
                <StyledTableCell>Amount </StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
          </Table>
        </TabPanel>
      </Box>
    )
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderColor: 'white' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
        >
          <Tab
            label="Medical Records"
            sx={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Financial Records"
            sx={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
            }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Diagnosis</StyledTableCell>
              <StyledTableCell>Prescription</StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.patient.medicalRecords.map((record: MedicalRecord) => (
              <TableRow key={record.id}>
                <StyledTableCell>
                  {new Date(record.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  {record && record.medStaff ? record.medStaff.fullName : 'N/A'}
                </StyledTableCell>
                <StyledTableCell>{record.diagnosis}</StyledTableCell>
                <StyledTableCell>{record.prescription}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    id="basic-button"
                    aria-haspopup="true"
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Payment Date</StyledTableCell>
              <StyledTableCell>Staff</StyledTableCell>
              <StyledTableCell>Visit Type </StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Amount </StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.patient.hospitalBills.map((hospitalBill: HospitalBill) => (
              <TableRow key={hospitalBill.id}>
                <StyledTableCell>
                  {new Date(hospitalBill.date).toLocaleDateString('en-ZA')}
                </StyledTableCell>
                <StyledTableCell>
                  {_.get(hospitalBill, 'medStaff.fullName', 'N/A')}
                </StyledTableCell>
                <StyledTableCell>
                  {_.get(hospitalBill, 'appointment.visitType', 'N/A')}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(hospitalBill.deadlineDate).toLocaleDateString(
                    'en-ZA',
                  )}
                </StyledTableCell>
                <StyledTableCell>{hospitalBill.amount}</StyledTableCell>
                <StyledTableCell>{hospitalBill.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    id="basic-button"
                    aria-haspopup="true"
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
    </Box>
  )
}
