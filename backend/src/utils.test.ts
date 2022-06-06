import { getUserId } from './utils'
import { getDateOfLastMonday } from './utils'
import { getDateOfNextSunday } from './utils'

test('should fail if date is not date of last monday', async () => {
  const nowDateObject = new Date('2022-06-07')
  const spy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => nowDateObject.getDate())
  const monday = getDateOfLastMonday(nowDateObject)
  spy.mockRestore()
  const testMonday = new Date('2022-06-05T16:00:00.000Z')
  expect(monday).toEqual(new Date(testMonday.setHours(0, 0, 0, 0)))
})

test('should fail if date is not date of next sunday', async () => {
  const nowDateObject = new Date('2022-06-06')
  const spy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => nowDateObject.getDate())
  const sunday = getDateOfNextSunday(nowDateObject)
  spy.mockRestore()
  expect(sunday).toEqual(new Date('2022-06-12T15:59:59.000Z'))
})
