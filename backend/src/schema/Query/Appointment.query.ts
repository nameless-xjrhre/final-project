import { queryField, list, nonNull, intArg } from 'nexus'

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
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.appointment.findMany({
      where: {
        patientId: args.id,
        date: {
          lt: new Date(),
        },
      },
    }),
})

// get upcoming appointments
const QueryAppointmentUpcoming = queryField('upcomingAppointments', {
  type: list('Appointment'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.appointment.findMany({
      where: {
        patientId: args.id,
        date: {
          gt: new Date(),
        },
      },
    }),
})

// get an amount of appointments
// arguments are start and count
// it gets the nth appointment based on the start number ordered by ascending id
// count is the number of appointments to get
const QueryAppointmentAmount = queryField('appointmentsRange', {
  type: list('Appointment'),
  args: {
    start: nonNull(intArg()),
    count: nonNull(intArg()),
  },
  resolve: (_parent, { start, count }, context) =>
    context.prisma.appointment.findMany({
      skip: start,
      take: count,
      orderBy: {
        id: 'asc',
      },
    }),
})

export default [
  QueryAppointmentTotal,
  QueryAppointmentDoneTotal,
  QueryAppointmentPast,
  QueryAppointmentUpcoming,
  QueryAppointmentAmount,
]
