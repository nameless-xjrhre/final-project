import { ScheduleStatus } from '@prisma/client'
import { Context } from '../../../context'

export async function availableStaffs(ctx: Context) {
  return ctx.prisma.medicalStaff.findMany({
    where: {
      schedules: {
        some: {
          status: ScheduleStatus.OPEN,
        },
      },
    },
  })
}
