import { queryField } from 'nexus'

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

export default [QueryAppointmentTotal, QueryAppointmentDoneTotal]
