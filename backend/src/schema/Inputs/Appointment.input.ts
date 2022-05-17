import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { StatusType, VisitType } from '../Enums'

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

const EditAppointmentInput = inputObjectType({
  name: 'EditAppointmentInput',
  definition(t) {
    t.field('visitType', {
      type: VisitType,
    })
    t.date('date')
    t.field('status', {
      type: StatusType,
    })
  },
})

export default [CreateAppointmentInput, EditAppointmentInput]
