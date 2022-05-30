import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type ScheduleInputType = NexusGenInputs['CreateScheduleInput']

export function createSchedule(data: ScheduleInputType, ctx: Context) {
  return ctx.prisma.schedule.create({
    data: {
      medStaffId: data.medStaffId,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status,
    },
  })
}
