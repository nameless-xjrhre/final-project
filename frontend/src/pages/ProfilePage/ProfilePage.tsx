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
import RightSideBar from '../../components/RightSideBar'
import TabPanel from '../../components/TabPanel'
import './ProfilePage.css'
import Avatar from '@mui/material/Avatar'
import { Typography } from '@mui/material'
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

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

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
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      top: 31,
                      left: 60,
                      width: 96,
                      height: 96,
                    }}
                  />
                  <Typography variant="h6" noWrap component="div" mt={5} ml={5}>
                    Renzo Laporno
                  </Typography>
                  <Typography ml={8} noWrap component="div">
                    [ Patient ID ]
                  </Typography>
                  <Typography mt={-20} mx={35} noWrap component="div">
                    Gender
                  </Typography>
                  <Typography mt={1} mx={35} noWrap component="div">
                    Male
                  </Typography>
                  <Typography mt={5} mx={35} noWrap component="div">
                    Address
                  </Typography>
                  <Typography mt={1} mx={35} noWrap component="div">
                    Villa,Iloilo city{' '}
                  </Typography>
                  <Typography mt={-19} mx={52} component="div">
                    Birthday
                  </Typography>
                  <Typography mt={1} ml={52} component="div">
                    Jan 1, 2000 (22yrs old)
                  </Typography>
                  <Typography mt={-7} ml={80} component="div">
                    Contact Number
                  </Typography>
                  <Typography mt={1} ml={80} component="div">
                    09173553326
                  </Typography>
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
