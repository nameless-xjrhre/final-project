import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessibleIcon from '@mui/icons-material/Accessible'
import CreditCardIcon from '@mui/icons-material/CreditCard'

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccessibleIcon />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CreditCardIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItemButton>
  </>
)

export default mainListItems

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
)
