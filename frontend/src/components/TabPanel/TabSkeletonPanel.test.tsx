import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import user from '@testing-library/user-event'
import BasicTabs from './TabSkeletonPanel'
import { graphql } from 'msw'

describe('TabSkeletonPanel', () => {
  const renderPage = testRenderer(<BasicTabs />)

  it('TabSkeletonPanel renders correctly', async () => {
    renderPage()

    const medRecordLabel = screen.getByRole('tab', {
      name: /medical records/i,
    })
    expect(medRecordLabel.innerHTML).toContain('Medical Records')

    user.click(medRecordLabel)

    const date = screen.getByText(/date/i)
    expect(date.innerHTML).toBe('Date')

    const doctor = screen.getByText(/doctor/i)
    expect(doctor.innerHTML).toBe('Doctor')

    const diagnosis = screen.getByText(/diagnosis/i)
    expect(diagnosis.innerHTML).toBe('Diagnosis')

    const prescription = screen.getByText(/prescription/i)
    expect(prescription.innerHTML).toBe('Prescription')

    const financialRecordLabel = screen.getByRole('tab', {
      name: /financial records/i,
    })
    expect(financialRecordLabel.innerHTML).toContain('Financial Records')

    user.click(financialRecordLabel)

    const paymentDate = screen.getByText(/payment date/i)
    expect(paymentDate.innerHTML).toBe('Payment Date')

    const staff = screen.getByText(/staff/i)
    expect(staff.innerHTML).toBe('Staff')

    const dueDate = screen.getByText(/due date/i)
    expect(dueDate.innerHTML).toBe('Due Date')

    const amount = screen.getByText(/amount/i)
    expect(amount.innerHTML).toBe('Amount ')

    const status = screen.getByText(/status/i)
    expect(status.innerHTML).toBe('Status')

    const visitType = screen.getByText(/visit type/i)
    expect(visitType.innerHTML).toBe('Visit Type ')
  })
})
