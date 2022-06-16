import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { graphql } from 'msw'
import { testRenderer } from '../../utils/test-util'
import BasicTabs from './TabPanel'
import {
  PatientRecordsQuery,
  PatientRecordsQueryVariables,
  BillStatus,
  VisitType,
} from '../../graphql/generated'

describe('TabPanel', () => {
  const renderPage = testRenderer(<BasicTabs patientId={1} />)

  it('TabPanel renders correctly', async () => {
    renderPage(
      graphql.query<PatientRecordsQuery, PatientRecordsQueryVariables>(
        'TabPanel',
        (req, res, ctx) =>
          // const { start, count } = req.variables
          res(
            ctx.data({
              patient: {
                id: 1,
                medicalRecords: [
                  {
                    date: new Date(2022, 1, 2),
                    diagnosis: 'Has cold lol',
                    prescription: 'Just chill bro',
                    medStaff: { id: 10, fullName: 'Bob Joe' },
                  },
                ],
                hospitalBills: [
                  {
                    date: new Date(2022, 1, 2),
                    deadlineDate: new Date(2022, 2, 2),
                    amount: 1150,
                    status: BillStatus.Unpaid,
                    medStaff: { fullName: 'Bob Joe' },
                    appointment: { visitType: VisitType.Routine },
                  },
                ],
              },
            }),
          ),
      ),
    )

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
