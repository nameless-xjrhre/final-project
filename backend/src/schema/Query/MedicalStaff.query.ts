import { ScheduleStatus } from '@prisma/client'
import { queryField, list } from 'nexus'

const QueryAvailableStaffs = queryField('availableStaffs', {
  type: list('MedicalStaff'),
  resolve: (_parent, args, context) =>
    context.prisma.medicalStaff.findMany({
      where: {
        schedules: {
          some: {
            status: ScheduleStatus.OPEN,
          },
        },
      },
    }),
})

export default [QueryAvailableStaffs]
