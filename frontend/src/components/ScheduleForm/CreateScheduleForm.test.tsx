import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import CreateScheduleForm from './CreateScheduleForm'

describe('CreateScheduleForm', () => {
  const renderForm = testRenderer(
    <CreateScheduleForm
      open
      handleClose={() => {
        false
      }}
    />,
  )

  it('Rander Create Schedule Form Correctly', () => {
    renderForm()

    const label = screen.getByRole('heading', {
      name: /create schedule/i,
      hidden: true,
    })
    expect(label.innerHTML).toBe('Create Schedule')

    const selectDaysLabel = screen.getByText(/select days/i)
    expect(selectDaysLabel.innerHTML).toBe('Select Days')

    const selectTimeLabel = screen.getByText(/select start time/i)
    expect(selectTimeLabel.innerHTML).toBe('Select Start Time')

    const endTimeLabel = screen.getByText(/select end time/i)
    expect(endTimeLabel.innerHTML).toBe('Select End Time')

    const createSchedButton = screen.getByRole('button', {
      name: /create schedule/i,
      hidden: true,
    })
    expect(createSchedButton.innerHTML).toContain('Create Schedule')
  })
})
