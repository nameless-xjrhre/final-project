import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Typography, Avatar } from '@mui/material'
import { useQuery, gql } from 'urql'
import { useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Sidebar from '../../components/Sidebar'
import RightSideBar from '../../components/RightSideBar'
import TabPanel from '../../components/TabPanel'

import { capitalize } from '../../utils'

import './ProfilePage.css'

const drawerWidth: number = 240

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

const PatientDocumentQuery = gql`
  query PatientDetails($id: Int!) {
    patient(id: $id) {
      id
      fullName
      sex
      address
      dateOfBirth
      contactNum
    }
  }
`

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const HeaderText = { mt: 3, color: '#646060', fontWeight: 700 }

const mdTheme = createTheme()

function DashboardContent() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const { id } = useParams()

  const [{ data, fetching, error }] = useQuery({
    query: PatientDocumentQuery,
    variables: { id: parseInt(id!, 10) },
  })

  if (fetching) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', boxShadow: 3 }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{Sidebar}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: '#F6F8FB',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: '100%',
                  }}
                >
                  <Grid
                    container
                    width="100%"
                    sx={{
                      fontFamily: 'Lato',
                      marginTop: 4,
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        ml: 4,
                      }}
                    >
                      <Stack>
                        <Avatar
                          alt={data.patient.fullName}
                          src="/static/images/avatar/1.jpg"
                          sx={{
                            width: 96,
                            height: 96,
                          }}
                        />
                        <Typography noWrap component="div" sx={HeaderText}>
                          {data.patient.fullName}
                        </Typography>
                        <Typography noWrap component="div">
                          {`Patient ID: ${data.patient.id}`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack sx={{ marginBottom: 5 }}>
                        <Typography
                          sx={{ mb: 0.5, color: '#646060', fontWeight: 700 }}
                        >
                          Gender
                        </Typography>
                        <Typography>
                          {capitalize(data.patient.sex.toLowerCase())}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          sx={{ mb: 0.5, color: '#646060', fontWeight: 700 }}
                        >
                          Address
                        </Typography>
                        <Typography>{data.patient.address}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack sx={{ marginBottom: 5 }}>
                        <Typography sx={{ color: '#646060', fontWeight: 700 }}>
                          Birthday
                        </Typography>
                        <Typography>
                          {new Date(
                            data.patient.dateOfBirth,
                          ).toLocaleDateString('en-ZA')}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          sx={{ mb: 0.5, color: '#646060', fontWeight: 700 }}
                        >
                          Contact Number
                        </Typography>
                        <Typography>{data.patient.contactNum}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TabPanel />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <RightSideBar />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
