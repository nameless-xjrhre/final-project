import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import Appointments from './AppointmentsList'
import { graphql } from 'msw'
import {
  AppointmentsQuery,
  AppointmentStatus,
  VisitType,
  AppointmentsQueryVariables,
} from '../../graphql/generated'

describe('Appointments', () => {
  const renderPage = testRenderer(<Appointments />)

  it('Checks if Appointments renders correctly', async () => {
    renderPage(
      graphql.query<AppointmentsQuery, AppointmentsQueryVariables>(
        'Appointments',
        (req, res, ctx) =>
          res(
            ctx.data({
              appointmentsRange: [
                {
                  id: 1,
                  visitType: VisitType.Routine,
                  date: new Date(2022, 1, 2),
                  status: AppointmentStatus.Canceled,
                  patient: {
                    id: 1,
                    fullName: 'James Harvey',
                  },
                  medStaff: {
                    id: 1,
                    fullName: 'Bob Joe',
                  },
                },
              ],
              totalAppointments: 2,
            }),
          ),
      ),
    )

    const nameCell = await screen.findByTestId('name-1')
    expect(nameCell).toHaveTextContent('James Harvey')

    // get visitType called "visit-type-1"
    const visitTypeCell = await screen.findByTestId('visit-type-1')
    expect(visitTypeCell.innerHTML).toBe('ROUTINE')

    // get date called "date-1"
    const dateCell = await screen.findByTestId('date-1')
    expect(dateCell.innerHTML).toBe('2022/02/02')

    // get visit time called "visit-time-1"
    const visitTimeCell = await screen.findByTestId('visit-time-1')
    expect(visitTimeCell.innerHTML).toBe('24:00:00')

    // get id called "doctor-1"
    const doctorCell = await screen.findByTestId('doctor-1')
    expect(doctorCell.innerHTML).toBe('Dr. Bob Joe')

    // get status called "status-1"
    const statusCell = await screen.findByTestId('status-1')
    expect(statusCell.textContent).toBe('canceled')
  })

  it('renders a list even if some fields are null or missing', async () => {
    renderPage(
      graphql.query<AppointmentsQuery, AppointmentsQueryVariables>(
        'Appointments',
        (req, res, ctx) =>
          res(
            ctx.data({
              appointmentsRange: [
                {
                  id: 1,
                  visitType: VisitType.Followup,
                  date: new Date(2022, 1, 1),
                  status: AppointmentStatus.Done,
                  patient: {
                    id: 1,
                    fullName: 'Janine Tugonon',
                  },
                  medStaff: {
                    id: 1,
                    fullName: 'Joseph Nightingale',
                  },
                },
                {
                  id: 2,
                  visitType: VisitType.Routine,
                  date: new Date(2022, 1, 1),
                  status: AppointmentStatus.Done,
                  patient: {
                    id: 1,
                    fullName: 'Hermione Leviosa',
                  },
                  medStaff: {
                    id: 1,
                    fullName: 'Christopher Jones',
                  },
                },
              ],
              totalAppointments: 2,
            }),
          ),
      ),
    )

    // find if the name Janine Tugonon exists
    const nameCell = await screen.findByText('Janine Tugonon')
    expect(nameCell).toBeInTheDocument()

    // check visit-type-1
    const visitTypeCell = await screen.findByTestId('visit-type-1')
    expect(visitTypeCell.textContent).toBe('FOLLOWUP')

    // check status-2
    const statusCell = await screen.findByTestId('status-2')
    expect(statusCell).toHaveTextContent('done')
  })
})
