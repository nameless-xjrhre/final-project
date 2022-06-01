import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Stack from '@mui/material/Stack'
import { gql, useQuery } from 'urql'
import { useParams } from 'react-router-dom'

interface AppointmentHistoryQuery {
  upcomingAppointments: {
    id: number
    date: Date
    visitType: String
    medStaff: {
      fullName: String
    }
  }[]
  pastAppointments: {
    id: number
    date: Date
    visitType: String
    medStaff: {
      fullName: String
    }
  }[]
}

const AppointmentHistoryQueryDocument = gql`
  query AppointmentHistory($id: Int!) {
    upcomingAppointments(id: $id) {
      id
      date
      visitType
      medStaff {
        fullName
      }
    }
    pastAppointments(id: $id) {
      id
      date
      visitType
      medStaff {
        fullName
      }
    }
  }
`

function displayVisitType(visitType: String) {
  switch (visitType) {
    case 'FOLLOWUP':
      return (
        <Typography
          style={{
            color: '#6562F0',
          }}
        >
          Follow Up
        </Typography>
      )
    case 'ROUTINE':
      return (
        <Typography
          style={{
            color: '#57E799',
          }}
        >
          Routine
        </Typography>
      )
    case 'URGENT':
      return (
        <Typography
          style={{
            color: '#F6CE3E',
          }}
        >
          Urgent
        </Typography>
      )
    default:
      return (
        <Typography
          style={{
            color: '#F85353',
          }}
        >
          N/A
        </Typography>
      )
  }
}

export default function PermanentDrawerRight() {
  const { id } = useParams()

  const [result] = useQuery<AppointmentHistoryQuery>({
    query: AppointmentHistoryQueryDocument,
    variables: { id: parseInt(id!, 10) },
  })

  const { data } = result

  return (
    <Box sx={{ fontFamily: 'Lato' }}>
      <CssBaseline />

      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Typography
          style={{
            marginTop: '20px',
            color: '#8F8F8F',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          variant="subtitle1"
          noWrap
          component="div"
          align="center"
        >
          Upcoming Appointments
        </Typography>
        <Timeline
          style={{
            paddingLeft: '0px',
            paddingRight: '-10px',
          }}
        >
          {data?.upcomingAppointments.map((appointment) => (
            <TimelineItem
              style={{
                maxWidth: 100,
                paddingLeft: '0px',
                paddingRight: '-10px',
              }}
              key={appointment.id}
            >
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  style={{
                    borderColor: '#FFC839',
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent>
                <Stack>
                  <Typography
                    style={{
                      marginRight: 10,
                      marginBottom: 5,
                    }}
                  >
                    {new Date(appointment.date).toLocaleTimeString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>

                  <Stack
                    direction="row"
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    {displayVisitType(appointment.visitType)}
                  </Stack>
                  <Stack direction="row">
                    <Typography>{appointment.medStaff.fullName}</Typography>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Divider />
        <Typography
          variant="subtitle1"
          noWrap
          component="div"
          align="center"
          sx={{
            color: '#8F8F8F',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Past Appointments
        </Typography>
        <Timeline
          style={{
            paddingLeft: '0px',
            paddingRight: '-10px',
          }}
        >
          {data?.pastAppointments.map((appointment) => (
            <TimelineItem
              style={{
                maxWidth: 100,
                paddingLeft: '0px',
                paddingRight: '-10px',
              }}
              key={appointment.id}
            >
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  style={{
                    borderColor: '#FFC839',
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent>
                <Stack>
                  <Typography
                    style={{
                      marginRight: 10,
                      marginBottom: 5,
                    }}
                  >
                    {new Date(appointment.date).toLocaleTimeString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>

                  <Stack
                    direction="row"
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    <Typography>
                      {displayVisitType(appointment.visitType)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography>{appointment.medStaff.fullName}</Typography>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Drawer>
    </Box>
  )
}
