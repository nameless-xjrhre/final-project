import { expect, it, describe } from 'vitest'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import DashboardPage from './SampleDashboard'

describe('DashboardPage', () => {
  const renderPage = testRenderer(<DashboardPage />)
  it('renders', async () => {
    renderPage()
    const dashboard = await screen.findByTestId('dashboard')
    expect(dashboard).toHaveTextContent('SampleDashboard')
  })
})
