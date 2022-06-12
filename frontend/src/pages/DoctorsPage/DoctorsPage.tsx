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
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AddIcon from '@mui/icons-material/Add'
import DoctorsScheduler from '../../components/DoctorsScheduler'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import AddDoctorIcon from './AddDoctorIcon'
import CreateScheduleForm from '../../components/ScheduleForm/CreateScheduleForm'
import AddDoctor from '../../components/DoctorForm/AddDoctorForm'
import { HeaderType } from '../../types/enums'

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

function DashboardContent() {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const [createScheduleBtn, setCreateScheduleBtn] = React.useState(false)
  const handleCreateScheduleOpen = () => setCreateScheduleBtn(true)
  const handleCreateScheduleClose = () => setCreateScheduleBtn(false)
  const [addDoctorBtn, setCreateDoctorBtn] = React.useState(false)
  const handleCreateDoctorOpen = () => setCreateDoctorBtn(true)
  const handleAddDoctorClose = () => setCreateDoctorBtn(false)
  const actions = [
    {
      icon: <AddDoctorIcon onClick={handleCreateDoctorOpen} />,
      name: 'Add Doctor',
    },
    {
      icon: <AddIcon onClick={handleCreateScheduleOpen} />,
      name: 'Create New Schedule',
    },
  ]

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
            <Header type={HeaderType.Doctors} />
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
                  <DoctorsScheduler />
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ right: 30, bottom: 30, position: 'absolute' }}
                    icon={<FontAwesomeIcon icon={faUserDoctor} size="2x" />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                      />
                    ))}
                  </SpeedDial>
                  {createScheduleBtn && (
                    <CreateScheduleForm
                      handleClose={handleCreateScheduleClose}
                      open={createScheduleBtn}
                    />
                  )}
                  {addDoctorBtn && (
                    <AddDoctor
                      handleClose={handleAddDoctorClose}
                      open={addDoctorBtn}
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
