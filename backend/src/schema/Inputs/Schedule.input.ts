import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { ScheduleStatusType } from '../Enums'

const CreateScheduleInput = inputObjectType({
  name: 'CreateScheduleInput',
  definition(t) {
    t.field(gqlTypes.Schedule.medStaffId)
    t.field(gqlTypes.Schedule.startTime)
    t.field(gqlTypes.Schedule.endTime)
    t.nonNull.field('status', {
      type: ScheduleStatusType,
    })
  },
})

const EditScheduleInput = inputObjectType({
  name: 'EditScheduleInput',
  definition(t) {
    t.int('medStaffId')
    t.date('startTime')
    t.date('endTime')
    t.field('status', {
      type: ScheduleStatusType,
    })
  },
})

export default [CreateScheduleInput, EditScheduleInput]
