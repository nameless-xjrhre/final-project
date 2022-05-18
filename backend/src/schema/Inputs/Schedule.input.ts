import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { ScheduleStatusType } from '../Enums'

const CreateScheduleInput = inputObjectType({
  name: 'CreateScheduleInput',
  definition(t) {
    t.field(gqlTypes.Schedule.medStaffId)
    t.field(gqlTypes.Schedule.startTime)
    t.field(gqlTypes.Schedule.endTime)
    t.field('status', {
      type: ScheduleStatusType,
    })
  },
})

export default [CreateScheduleInput]
