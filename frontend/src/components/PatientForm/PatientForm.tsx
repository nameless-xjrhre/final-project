import * as React from 'react'
import {
  Fab,
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  IconButton,
  TextField,
  TextFieldProps,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheelchair } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, gql } from 'urql'
import { MutationCreatePatientArgs, Sex } from '../../graphql/generated'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 3,
}

const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        justifyContent: 'space-between',
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          width: 255,
        },
        variant: 'outlined',
        margin: 'normal',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 13,
        },
      },
    },
  },
})

interface Patient {
  patients: {
    id: number
    firstName: string
    lastName: string
    sex: Sex
    dateObBirth: Date
    contactNum: string
    address: string
  }[]
}
const CreatePatient = gql`
  mutation CreatePatient(
    $firstName: String!
    $lastName: String!
    $sex: Sex!
    $dateOfBirth: DateTime!
    $contactNum: String!
    $address: String!
  ) {
    createPatient(
      firstName: $firstName
      lastName: $lastName
      sex: $sex
      dateOfBirth: $dateOfBirth
      contactNum: $contactNum
      address: $address
    ) {
      id
      firstName
      lastName
      sex
      dateOfBirth
      contactNum
      address
    }
  }
`

export default function PatientForm() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(new Date())
  const [, createPatient] = useMutation<Patient>(CreatePatient)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [contactNum, setContactNum] = React.useState('')
  const [address, setAddress] = React.useState('')

  const submitCreatePatient = (e: any) => {
    e.preventDefault()
    const sex = gender === 'male' ? Sex.Male : Sex.Female
    const input: MutationCreatePatientArgs = {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      contactNum,
      address,
    }
    createPatient(input).then((result) => {
      console.log(result)
    })
  }

  return (
    <>
      <Fab
        onClick={handleOpen}
        color="primary"
        sx={{
          right: 30,
          bottom: 30,
          position: 'absolute',
          background: '#336CFB',
        }}
      >
        <FontAwesomeIcon icon={faWheelchair} fontSize={28} />
        <AddIcon sx={{ marginTop: -2, marginLeft: -2 }} />
      </Fab>
      <ThemeProvider theme={theme}>
        <Modal open={open}>
          <Box sx={style}>
            <Grid container>
              <Typography variant="h6" color="GrayText">
                Add Patient
              </Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Divider />
            <Typography variant="body2" color="GrayText" mt={2} mb={-1}>
              Personal Information
            </Typography>
            <Grid container>
              <TextField
                id="first-name"
                label="First Name"
                InputProps={{ style: { fontSize: 12 } }}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormControl sx={{ width: 255 }}>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup row onChange={(e) => setGender(e.target.value)}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container mt={-2} mb={1}>
              <TextField
                id="last-name"
                label="Last Name"
                InputProps={{ style: { fontSize: 12 } }}
                onChange={(e) => setLastName(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Date of Birth"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={dateOfBirth}
                  onChange={(newValue: React.SetStateAction<Date | null>) => {
                    setDateOfBirth(newValue)
                  }}
                  renderInput={(params: TextFieldProps) => (
                    <TextField
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Typography variant="body2" mb={1} color="GrayText">
              Contact Information
            </Typography>
            <Grid container mt={-2} mb={3}>
              <TextField
                id="contact-num"
                label="Contact Number"
                placeholder="09xxxxxxxxx"
                InputProps={{ inputMode: 'numeric', style: { fontSize: 12 } }}
                onChange={(e) => setContactNum(e.target.value)}
              />
              <TextField
                id="address"
                label="Address"
                InputProps={{ inputMode: 'text', style: { fontSize: 12 } }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Button
              variant="contained"
              sx={{
                background: '#336CFB',
                display: 'block',
                marginLeft: 'auto',
              }}
              onClick={submitCreatePatient}
            >
              Add Patient
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  )
}
