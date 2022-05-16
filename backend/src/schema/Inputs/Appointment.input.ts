import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { StatusType } from '../Enums'

const CreateAppointmentInput = inputObjectType({
  name: 'CreateAppointmentInput',
  definition(t) {
    t.field(gqlTypes.Appointment.visitType)
    t.field(gqlTypes.Appointment.date)
    t.nonNull.field('status', {
      type: StatusType,
    })
  },
})

export default [CreateAppointmentInput]
