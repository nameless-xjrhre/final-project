import { Context } from '../../../context'

export function queryDoneAppointments(ctx: Context) {
  return ctx.prisma.appointment.count({
    where: {
      status: 'DONE',
    },
  })
}

export function queryTotalAppointments(ctx: Context) {
  return ctx.prisma.appointment.count()
}

export function queryPastAppointments(ctx: Context, args: { id: number }) {
  return ctx.prisma.appointment.findMany({
    where: {
      patientId: args.id,
      date: {
        lt: new Date(),
      },
    },
  })
}

export function queryUpcomingAppointments(ctx: Context, args: { id: number }) {
  return ctx.prisma.appointment.findMany({
    where: {
      patientId: args.id,
      date: {
        gt: new Date(),
      },
    },
  })
}

export function queryAppointmentsRange(
  ctx: Context,
  args: {
    start: number
    count: number
  },
) {
  return ctx.prisma.appointment.findMany({
    skip: args.start,
    take: args.count,
    orderBy: {
      id: 'asc',
    },
  })
}
