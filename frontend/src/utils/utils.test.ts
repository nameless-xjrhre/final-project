import { expect, test } from 'vitest'
import { ScheduleStatus } from '../graphql/generated'
import {
  getDueDate,
  getDueDateAfterUpdate,
  getDaysWithSchedule,
  getDaysWithNoSchedule,
  getSelectedStaffSchedules,
  disableNoScheduleDays,
} from './index'

const days = [0, 1, 2, 3, 4, 5, 6]

const medicalStaff = {
  id: 45,
  firstName: 'Jinx',
  lastName: 'Monsoon',
  contactNum: '213-3456-521',
  address: '6610 Gaylord Throughway',
  schedules: [
    {
      id: 50,
      startTime: '2022-06-06T09:30:00.912Z',
      endTime: '2022-06-06T16:30:00.912Z',
      medStaff: {
        id: 45,
      },
      status: ScheduleStatus.Open,
    },
    {
      id: 51,
      startTime: '2022-06-08T09:30:00.430Z',
      endTime: '2022-06-08T16:30:00.430Z',
      medStaff: {
        id: 45,
      },
      status: ScheduleStatus.Open,
    },
    {
      id: 52,
      startTime: '2022-06-10T09:30:00.430Z',
      endTime: '2022-06-10T16:30:00.430Z',
      medStaff: {
        id: 45,
      },
      status: ScheduleStatus.Closed,
    },
  ],
}

const medicalStaff1 = {
  id: 60,
  firstName: 'Chennie',
  lastName: 'Auro',
  address: 'Landheights Jaro',
  contactNum: '(371) 331-2415',
  schedules: [
    {
      id: 59,
      startTime: '2022-06-05T10:00:00.512Z',
      endTime: '2022-06-05T17:00:00.997Z',
      status: ScheduleStatus.Open,
      medStaff: {
        id: 60,
      },
    },
  ],
}

test('should return the due date', () => {
  const date = new Date('2020-01-01')
  const paymentTerm = '7 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2020-01-08'))
})

test('should return due date of december 25', () => {
  const date = new Date('2020-12-25')
  const paymentTerm = '15 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2021-01-09'))
})

test('should test if term is 0 days', () => {
  const date = new Date('2020-12-25')
  const paymentTerm = '0 days'

  expect(getDueDate(paymentTerm, date)).toEqual(new Date('2020-12-25'))
})

test('should return the due date after update', () => {
  const date = new Date('2020-01-01')
  const paymentTerm = '7 days'
  const deadlineDate = new Date('2020-01-08')

  expect(getDueDateAfterUpdate(date, paymentTerm, deadlineDate)).toEqual(
    new Date('2020-01-08'),
  )
})

describe('getDaysWithSchedule', () => {
  it('should get days of an available staff that has schedule', async () => {
    // days of the week: 0-Sun, 1-Mon, 2-Tue, 3-Wed etc..
    const expectedScheduledDays = [1, 3, 5]

    expect(getDaysWithSchedule(medicalStaff.schedules)).toEqual(
      expectedScheduledDays,
    )
  })
})

describe('getDaysWithNoSchedule', () => {
  it('should get days of an available staff that has no schedule', () => {
    const expectedNoScheduleDays = [0, 2, 4, 6]

    expect(getDaysWithNoSchedule(days, medicalStaff.schedules)).toEqual(
      expectedNoScheduleDays,
    )
  })
})

describe('getSelectedStaffSchedules', () => {
  it("should return a selected staff's schedules", () => {
    const availableStaffs = [medicalStaff, medicalStaff1]
    const expectedSchedules = [
      {
        id: 59,
        startTime: '2022-06-05T10:00:00.512Z',
        endTime: '2022-06-05T17:00:00.997Z',
        status: 'OPEN',
        medStaff: {
          id: 60,
        },
      },
    ]

    expect(getSelectedStaffSchedules(60, availableStaffs)).toEqual(
      expectedSchedules,
    )
  })
})

describe('disableNoScheduleDays', () => {
  it('should be falsy thus disable dates with no assigned schedules', () => {
    expect(
      disableNoScheduleDays(new Date(), medicalStaff.schedules, days),
    ).toBeFalsy()
  })

  it('should be truthy with inavlid inputs thus enable all dates', () => {
    const schedules = [
      {
        id: 100,
        startTime: '',
        endTime: '',
        medStaff: {
          id: 43,
        },
        status: ScheduleStatus.Open,
      },
    ]
    expect(disableNoScheduleDays(new Date(), schedules, days)).toBeTruthy()
  })
})
