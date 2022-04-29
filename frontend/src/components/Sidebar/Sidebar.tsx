import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faColumns,
  faStethoscope,
  faUserDoctor,
  faCreditCard,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons'

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <FontAwesomeIcon icon={faColumns} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FontAwesomeIcon icon={faStethoscope} />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FontAwesomeIcon icon={faUserDoctor} />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FontAwesomeIcon icon={faWheelchair} />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FontAwesomeIcon icon={faCreditCard} />
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
