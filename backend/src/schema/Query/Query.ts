import { objectType } from 'nexus'
import PatientQueries from './Patient.query'
import AppointmentQueries from './Appointment.query'
import HospitalBillQueries from './HospitalBill.query'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context) => context.prisma.user.findMany(),
    })
    t.nonNull.list.nonNull.field('patients', {
      type: 'Patient',
      resolve: (_parent, _args, context) => context.prisma.patient.findMany(),
    })
    t.nonNull.list.nonNull.field('medicalStaff', {
      type: 'MedicalStaff',
      resolve: (_parent, _args, context) =>
        context.prisma.medicalStaff.findMany(),
    })
    t.nonNull.list.nonNull.field('appointments', {
      type: 'Appointment',
      resolve: (_parent, _args, context) =>
        context.prisma.appointment.findMany(),
    })
    t.nonNull.list.nonNull.field('medicalRecords', {
      type: 'MedicalRecord',
      resolve: (_parent, _args, context) =>
        context.prisma.medicalRecord.findMany(),
    })
    t.nonNull.list.nonNull.field('hospitalBills', {
      type: 'HospitalBill',
      resolve: (_parent, _args, context) =>
        context.prisma.hospitalBill.findMany(),
    })
    t.nonNull.list.nonNull.field('schedules', {
      type: 'Schedule',
      resolve: (_parent, _args, context) => context.prisma.schedule.findMany(),
    })
  },
})

export default [
  Query,
  ...PatientQueries,
  ...AppointmentQueries,
  ...HospitalBillQueries,
]
