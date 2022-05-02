import { objectType, enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

import MedicalStaff from './MedicalStaff'
import Patient from './Patient'

const VisitType = enumType(gqlTypes.VisitType)
const StatusType = enumType(gqlTypes.AppointmentStatus)

const Appointment = objectType({
  name: 'Appointment',
  definition(t) {
    t.field(gqlTypes.Appointment.id)
    t.field(gqlTypes.Appointment.date)
    t.field('visitType', {
      type: VisitType,
    })
    t.field('status', {
      type: StatusType,
    })
    t.field('patient', {
      type: Patient,
      resolve: (parent, _args, context) =>
        context.prisma.appointment
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .patient(),
    })
    t.field('medStaff', {
      type: MedicalStaff,
      resolve: (parent, _args, context) =>
        context.prisma.appointment
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .medStaff(),
    })
  },
})

export default Appointment
