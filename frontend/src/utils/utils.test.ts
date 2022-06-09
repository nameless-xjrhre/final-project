import { getDueDate, getDueDateAfterUpdate } from './index'

it('should return the due date', () => {
  const date = new Date('2020-01-01')
  const paymentTerm = '7 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2020-01-08'))
})

it('should return due date of december 25', () => {
  const date = new Date('2020-12-25')
  const paymentTerm = '15 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2021-01-09'))
})

it('should test if term is 0 days', () => {
  const date = new Date('2020-12-25')
  const paymentTerm = '0 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2020-12-25'))
})

it('should return the due date after update', () => {
  const date = new Date('2020-01-01')
  const paymentTerm = '7 days'
  const deadlineDate = new Date('2020-01-08')

  expect(getDueDateAfterUpdate(date, paymentTerm, deadlineDate)).toEqual(
    new Date('2020-01-08'),
  )
})
