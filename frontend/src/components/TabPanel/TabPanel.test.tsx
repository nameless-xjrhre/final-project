import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import BasicTabs from './TabPanel'
import { graphql } from 'msw'
import {
  PatientRecordsQuery,
  PatientRecordsQueryVariables,
  BillStatus,
  VisitType,
} from '../../graphql/generated'

describe('TabSkeletPanel', () => {
  const renderPage = testRenderer(<BasicTabs patientId={1} />)

  it('TabSkeletonPanel renders correctly', async () => {
    renderPage(
      graphql.query<PatientRecordsQuery, PatientRecordsQueryVariables>(
        'PermanentDrawerRight',
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
                    medStaff: { fullName: 'Bob Joe' },
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

    const date = screen.getByText(/date/i)
    expect(date.innerHTML).toBe('Date')

    const doctor = screen.getByText(/doctor/i)
    expect(doctor.innerHTML).toBe('Doctor')

    const diagnosis = screen.getByText(/diagnosis/i)
    expect(diagnosis.innerHTML).toBe('Diagnosis')

    const prescription = screen.getByText(/prescription/i)
    expect(prescription.innerHTML).toBe('Prescription')
  })
})
