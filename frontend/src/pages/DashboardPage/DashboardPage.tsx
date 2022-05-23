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
import Sidebar from '../../components/Sidebar'
import HeaderDashboard from '../../components/Header/HeaderDashboard'
import DetailsCount from '../../components/Dashboard/DetailsCount'
import AppointmentsList from '../../components/Dashboard/AppointmentsList'

import AppointmentLogo from '../../images/icons/AppointmentLogo.svg'
import BankLogo from '../../images/icons/BankLogo.svg'
import OperationsLogo from '../../images/icons/OperationsLogo.svg'
import PatientLogo from '../../images/icons/PatientLogo.svg'

interface DetailCardProps {
  logo: string
  title: string
  amount: string
}

const detailCards: DetailCardProps[] = [
  {
    logo: AppointmentLogo,
    title: 'Appointments',
    amount: '213',
  },
  {
    logo: PatientLogo,
    title: 'New Patients',
    amount: '104',
  },
  {
    logo: OperationsLogo,
    title: 'Operations',
    amount: '24',
  },
  {
    logo: BankLogo,
    title: 'Earnings',
    amount: '₱ 12,174',
  },
]

const drawerWidth: number = 240

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

const mdTheme = createTheme()

function DashboardPage() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
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
            <HeaderDashboard />
            <Box
              sx={{
                mt: 4,
              }}
            >
              <DetailsCount detailCards={detailCards} />
            </Box>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
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
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                      }}
                    >
                      <AppointmentsList />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default DashboardPage
