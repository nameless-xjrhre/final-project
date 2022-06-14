import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { graphql } from 'msw'
import { testRenderer } from '../../utils/test-util'
import { displayVisitType } from './RightSideBar'
import PermanentDrawerRight from './RightSideBar'
import {
  AppointmentHistoryQuery,
  AppointmentHistoryQueryVariables,
  VisitType,
} from '../../graphql/generated'

describe('Display Visit Type', () => {
  it('Displays Follow Up Correctly', () => {
    expect(displayVisitType('FOLLOWUP').props.children).toBe('Follow Up')
  })

  it('Displays Routine Correctly', () => {
    expect(displayVisitType('ROUTINE').props.children).toBe('Routine')
  })

  it('Displays Urgent Correctly', () => {
    expect(displayVisitType('URGENT').props.children).toBe('Urgent')
  })

  it('Displays N/A Correctly', () => {
    expect(displayVisitType('').props.children).toBe('N/A')
  })
})

describe('Permanent Drawer Right', () => {
  const renderPage = testRenderer(<PermanentDrawerRight />)

  it('Right Side Bar Renders Correctly', async () => {
    renderPage(
      graphql.query<AppointmentHistoryQuery, AppointmentHistoryQueryVariables>(
        'PermanentDrawerRight',
        (req, res, ctx) =>
          // const { start, count } = req.variables
          res(
            ctx.data({
              upcomingAppointments: [
                {
                  id: 3,
                  date: new Date(2023, 1, 1, 10, 0, 0),
                  visitType: VisitType.Routine,
                  medStaff: { fullName: 'Bob Joe' },
                },
              ],
              pastAppointments: [
                {
                  id: 5,
                  date: new Date(2022, 1, 1),
                  visitType: VisitType.Followup,
                  medStaff: { fullName: 'Nonoy Ungoy' },
                },
              ],
            }),
          ),
      ),
    )

    const upcomingLabel = screen.getByText(/upcoming appointments/i)
    expect(upcomingLabel.innerHTML).toBe('Upcoming Appointments')

    const pastLabel = screen.getByText(/past appointments/i)
    expect(pastLabel.innerHTML).toBe('Past Appointments')

    //const upcomingMedstaff = await screen.findByTestId('upcoming-visit-3')
    //expect(upcomingMedstaff.innerHTML).toContain('Routine')
  })
})
