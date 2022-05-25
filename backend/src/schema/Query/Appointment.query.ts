import { queryField, list } from 'nexus'

// get the total number of appointments
const QueryAppointmentTotal = queryField('totalAppointments', {
  type: 'Int',
  resolve: (_parent, _args, context) => context.prisma.appointment.count(),
})

// get the totoal number of "done" appointments
const QueryAppointmentDoneTotal = queryField('totalDoneAppointments', {
  type: 'Int',
  resolve: (_parent, _args, context) =>
    context.prisma.appointment.count({
      where: {
        status: 'DONE',
      },
    }),
})

// get past appointments
const QueryAppointmentPast = queryField('pastAppointments', {
  type: list('Appointment'),
  resolve: (_parent, _args, context) =>
    context.prisma.appointment.findMany({
      where: {
        date: {
          lt: new Date(),
        },
      },
    }),
})

// get upcoming appointments
const QueryAppointmentUpcoming = queryField('upcomingAppointments', {
  type: list('Appointment'),
  resolve: (_parent, _args, context) =>
    context.prisma.appointment.findMany({
      where: {
        date: {
          gt: new Date(),
        },
      },
    }),
})

export default [
  QueryAppointmentTotal,
  QueryAppointmentDoneTotal,
  QueryAppointmentPast,
  QueryAppointmentUpcoming,
]
