import { screen } from '@testing-library/react'
import { graphql } from 'msw'
import { testRenderer } from '../../utils/test-util'
import {
  AppointmentsQuery,
  AppointmentsQueryVariables,
  VisitType,
  AppointmentStatus,
} from '../../graphql/generated'
import AppointmentsList from './AppointmentsList'
import '@testing-library/jest-dom'

describe('AppointmentsList', () => {
  const renderPage = testRenderer(<AppointmentsList />)
  it('renders a list of 1 appointment', async () => {
    renderPage()
    // get id called "name-1"
    const nameCell = await screen.findByTestId('name-1')
    expect(nameCell).toHaveTextContent('John Doe')

    // get visitType called "visit-type-1"
    const visitTypeCell = await screen.findByTestId('visit-type-1')
    expect(visitTypeCell.innerHTML).toBe('Routine')

    // get date called "date-1"
    const dateCell = await screen.findByTestId('date-1')
    expect(dateCell.innerHTML).toBe('2020/02/01')

    // get visit time called "visit-time-1"
    const visitTimeCell = await screen.findByTestId('visit-time-1')
    expect(visitTimeCell.innerHTML).toBe('24:00:00')

    // get id called "doctor-1"
    const doctorCell = await screen.findByTestId('doctor-1')
    expect(doctorCell.innerHTML).toBe('Dr. Joseph Doe')

    // get status called "status-1"
    const statusCell = await screen.findByTestId('status-1')
    expect(statusCell.textContent).toBe('canceled')
  })

  it('renders a list even if some fields are null or missing', async () => {
    renderPage(
      graphql.query<AppointmentsQuery, AppointmentsQueryVariables>(
        'AppointmentsList',
        (req, res, ctx) =>
          res(
            ctx.data({
              appointmentsRange: [
                {
                  id: 1,
                  visitType: VisitType.Routine,
                  date: new Date(2020, 1, 1),
                  status: AppointmentStatus.Canceled,
                  patient: {
                    id: 1,
                    fullName: 'John Doe',
                  },
                  medStaff: {
                    id: 1,
                    fullName: 'Joseph Doe',
                  },
                },
                {
                  id: 2,
                  visitType: VisitType.Routine,
                  date: new Date(2020, 1, 1),
                  status: AppointmentStatus.Done,
                  patient: {
                    id: 1,
                    fullName: 'Harry Potter',
                  },
                  medStaff: {
                    id: 1,
                    fullName: 'Joseph Doe',
                  },
                },
              ],
              totalAppointments: 2,
            }),
          ),
      ),
    )

    // find if the name John Doe exists
    const nameCell = await screen.findByText('John Doe')
    expect(nameCell).toBeInTheDocument()

    // check visit-type-1
    const visitTypeCell = await screen.findByTestId('visit-type-1')
    expect(visitTypeCell.textContent).toBe('Routine')

    // check status-2
    const statusCell = await screen.findByTestId('status-2')
    expect(statusCell).toHaveTextContent('done')

    // get status-button-2
    const statusButton = await screen.findByText('done')
    expect(statusButton).toHaveStyle('background-color: rgb(240, 255, 233);')
  })
})
