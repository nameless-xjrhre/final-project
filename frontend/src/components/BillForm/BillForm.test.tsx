import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBillForm from './CreateBillForm'
import { testRenderer } from '../../utils/test-util'
import { graphql } from 'msw'
import {
  AppointmentStatus,
  ScheduleStatus,
  VisitType,
} from '../../graphql/generated'

const appointment = {
  id: 1,
  visitType: VisitType.Followup,
  date: '2022-06-01T02:30:00.225Z',
  status: AppointmentStatus.Pending,
  note: 'stomach ache',
  patient: {
    id: 1004,
    fullName: 'James Reid',
  },
  medStaff: {
    id: 7,
    fullName: 'Idell Huels',
    schedules: [
      {
        id: 15,
        startTime: '2022-06-01T02:30:00.225Z',
        endTime: '2022-06-01T10:30:00.225Z',
        status: ScheduleStatus.Open,
        medStaff: {
          id: 7,
        },
      },
      {
        id: 20,
        startTime: '2022-06-03T02:30:00.904Z',
        endTime: '2022-06-03T10:30:00.904Z',
        status: ScheduleStatus.Open,
        medStaff: {
          id: 7,
        },
      },
    ],
  },
}
beforeEach(() => {
  render(<CreateBillForm handleClose={() => false} open toUpdate={false} />)
})

describe('AppointmentForm - Create Bill', () => {
  it('should render defult state', async () => {
    //should check if hear  is create bill
    const formHeadeing = screen.getByRole('heading', { level: 6 })
    expect(formHeadeing.textContent).toBe('Create Bill')
    //should check if button is create bill
    const submitButton = await screen.findByRole('button', {
      name: /create bill/i,
    })
    expect(submitButton.textContent).toBe('Create Bill')
  })
  it('should show error when there are no contents', async () => {
    //will click create bill with empty forms
    const submitButton = screen.getByRole('button', {
      name: /create bill/i,
    })
    userEvent.click(submitButton)
    //should display select amount text
    const selectAmount = await screen.findByText(/amount./i)
    expect(selectAmount).toBeInTheDocument()
    //should display select payment term
    const selectPaymentTerm = await screen.findByText(/payment term./i)
    expect(selectPaymentTerm).toBeInTheDocument()
    // should display Amount is required text
    const selectAmountFirst = await screen.findByText(/Amount is required./i)
    expect(selectAmountFirst).toBeInTheDocument()
    //should display Select payment terms
    const selectPaymentTermFIrst = await screen.findByText(
      /Select payment terms./i,
    )
    expect(selectPaymentTermFIrst).toBeInTheDocument()
  })
  const renderForm = testRenderer(
    <CreateBillForm
      handleClose={() => false}
      open
      toUpdate={false}
      appointment={appointment}
    />,
  )
  it('should display selected and type of input', async () => {
    const mutation = vi.fn()
    renderForm(
      graphql.mutation('CreateBill', (req, res, ctx) => {
        mutation(req.variables)
        return res(
          ctx.data({
            createHospitalBill: {
              __typename: 'HospitalBill',
              id: 1,
            },
          }),
        )
      }),
    )

    const payment = /payment term/i
    const selectPaymentTerm = await within(
      screen.getByRole('combobox', { name: payment }),
    ).findByRole('button')
    userEvent.click(selectPaymentTerm)
    const billsList = await within(screen.getByRole('presentation')).findByRole(
      'listbox',
    )

    userEvent.selectOptions(
      billsList,
      await within(billsList).findByRole('option', {
        name: '0 days',
      }),
    )
    expect(selectPaymentTerm.textContent).toBe(' 0 days')

    const amount = screen.getByRole('textbox')
    userEvent.type(amount, '1300')
    expect(amount).toHaveDisplayValue('1300')

    const submitButton = screen.getByRole('button', {
      name: /create bill/i,
    })

    userEvent.click(submitButton)
  })
})
