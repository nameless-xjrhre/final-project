import { Schedule, ScheduleStatus } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createSchedule } from './Schedule.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create a schedule', async () => {
  const schedule: Schedule = {
    id: 1,
    medStaffId: 1,
    startTime: new Date('2020-01-01'),
    endTime: new Date('2020-01-01'),
    status: ScheduleStatus.CLOSED,
  }

  mockCtx.prisma.schedule.create.mockResolvedValue(schedule)

  const input = {
    medStaffId: 1,
    startTime: new Date('2020-01-01'),
    endTime: new Date('2020-01-01'),
    status: ScheduleStatus.CLOSED,
  }

  await expect(createSchedule(input, ctx)).resolves.toEqual(schedule)
})
