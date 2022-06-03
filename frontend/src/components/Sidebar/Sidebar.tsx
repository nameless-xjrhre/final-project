import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faColumns,
  faStethoscope,
  faUserDoctor,
  faCreditCard,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export const mainListItems = (
  <>
    <Box
      component="img"
      sx={{
        height: 80,
        width: 250,
      }}
      src="src/images/icons/Clinisync.png"
    />
    <Link to="/dashboard" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon icon={faColumns} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/appointments" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon icon={faStethoscope} />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
    </Link>
    <Link to="/doctors" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon icon={faUserDoctor} />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItemButton>
    </Link>
    <Link to="/patients" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon icon={faWheelchair} />
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItemButton>
    </Link>
    <Link to="/bills" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon icon={faCreditCard} />
        </ListItemIcon>
        <ListItemText primary="Bills" />
      </ListItemButton>
    </Link>
  </>
)

export default mainListItems
