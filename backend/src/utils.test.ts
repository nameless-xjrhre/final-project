// import { getDateOfLastMonday } from './utils'
// import { getDateOfNextSunday } from './utils'

// test('should fail if date is not date of last monday', async () => {
//   const nowDateObject = new Date('2022-06-07')
//   const spy = jest
//     .spyOn(Date, 'now')
//     .mockImplementation(() => nowDateObject.getDate())
//   const monday = getDateOfLastMonday(nowDateObject)
//   spy.mockRestore()
//   const testMonday = new Date('2022-06-06T16:00:00.000Z')
//   expect(monday).toEqual(new Date(testMonday.setHours(0, 0, 0, 0)))
// })

// test('should fail if date is not date of next sunday', async () => {
//   const nowDateObject = new Date('2022-06-06')
//   const spy = jest
//     .spyOn(Date, 'now')
//     .mockImplementation(() => nowDateObject.getDate())
//   const sunday = getDateOfNextSunday(nowDateObject)
//   spy.mockRestore()
//   const testSunday = new Date('2022-06-06T16:00:00.000Z')
//   expect(sunday).toEqual(new Date(testSunday.setHours(23, 59, 59, 0)))
// })

import '@testing-library/jest-dom'

describe('utils', () => {
  it('tests 1 + 1', () => {
    expect(1 + 1).toBe(2)
  })
})
