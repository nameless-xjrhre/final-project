import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

const drawerWidth = 240

export default function PermanentDrawerRight() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Typography variant="subtitle1" noWrap component="div" align="center">
          Upcoming Appointments
        </Typography>
        <Timeline
          position="right"
          style={{
            paddingLeft: '0px',
          }}
        >
          <TimelineItem
            style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="warning" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem
            style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem
            style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
          <TimelineItem
            style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Repeat</TimelineContent>
          </TimelineItem>
        </Timeline>

        <Divider />
        <Typography variant="subtitle1" noWrap component="div" align="center">
          Past Appointments
        </Typography>
      </Drawer>
    </Box>
  )
}
