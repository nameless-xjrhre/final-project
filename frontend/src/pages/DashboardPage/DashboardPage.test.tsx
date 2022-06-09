import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import DashboardPage from './SampleDashboard'

describe('DashboardPage', () => {
  const renderPage = testRenderer(<DashboardPage />)
  it('renders', async () => {
    renderPage()
    const loading = await screen.findByTestId('loading')
    expect(loading).toBeDefined()
    const totalAppointments = await screen.findByTestId('total-appointments')
    expect(totalAppointments.innerHTML).toBe('10')
  })
})
