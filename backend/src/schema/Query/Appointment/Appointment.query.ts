import { queryField, list, nonNull, intArg } from 'nexus'
import {
  queryDoneAppointments,
  queryTotalAppointments,
  queryPastAppointments,
  queryUpcomingAppointments,
  queryAppointmentsRange,
} from './Appointment.resolver'

// get the total number of appointments
const QueryAppointmentTotal = queryField('totalAppointments', {
  type: 'Int',
  resolve: (_parent, _args, context) => queryTotalAppointments(context),
})

// get the totoal number of "done" appointments
const QueryAppointmentDoneTotal = queryField('totalDoneAppointments', {
  type: 'Int',
  resolve: (_parent, _args, context) => queryDoneAppointments(context),
})

// get past appointments
const QueryAppointmentPast = queryField('pastAppointments', {
  type: list('Appointment'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => queryPastAppointments(context, args),
})

// get upcoming appointments
const QueryAppointmentUpcoming = queryField('upcomingAppointments', {
  type: list('Appointment'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => queryUpcomingAppointments(context, args),
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
    queryAppointmentsRange(context, { start, count }),
})

export default [
  QueryAppointmentTotal,
  QueryAppointmentDoneTotal,
  QueryAppointmentPast,
  QueryAppointmentUpcoming,
  QueryAppointmentAmount,
]
