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
} from '@mui/material'

function MedicalRecords(
  date: string,
  doctor: string,
  diagnosis: string,
  prescription: string,
) {
  return { date, doctor, diagnosis, prescription }
}
const data = [MedicalRecords('2022/10/17', 'Dr Renzo', 'COVID', 'J and J')]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
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
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Medical Records" {...a11yProps(0)} />
          <Tab label="Financial Records" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Doctor</StyledTableCell>
              <StyledTableCell>Diagnosis</StyledTableCell>
              <StyledTableCell>Perscription</StyledTableCell>
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
