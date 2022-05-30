import { mutationField, arg, nonNull, intArg, list } from 'nexus'
import { createSchedule } from './Schedule.resolver'

export const CreateSchedule = mutationField('createSchedule', {
  type: 'Schedule',
  args: {
    data: nonNull(
      arg({
        type: 'CreateScheduleInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createSchedule(args.data, context),
  validate: async (rules, args, context) => {
    // check if medStaffId exists
    const medStaff = await context.prisma.medicalStaff.findFirst({
      where: {
        id: args.data.medStaffId,
      },
    })
    if (!medStaff) {
      throw new Error('MedicalStaff not found')
    }
    // throw error if startTime is after endTime
    if (args.data.startTime > args.data.endTime) {
      throw new Error('Start time must be before end time')
    }
    // throw error if start time and end time is colliding with another schedule
    // also check if the schedule is for the same medstaff
    const schedule = await context.prisma.schedule.findMany({
      where: {
        medStaffId: args.data.medStaffId,
        AND: {
          startTime: {
            lte: args.data.startTime,
          },
          endTime: {
            gte: args.data.endTime,
          },
        },
      },
    })
    if (schedule.length > 0) {
      throw new Error('Schedule is colliding with another schedule')
    }
  },
})

export const CreateSchedules = mutationField('createSchedules', {
  type: list('Schedule'),
  args: {
    data: nonNull(
      arg({
        type: list(nonNull('CreateScheduleInput')),
      }),
    ),
  },
  resolve: async (_parent, args, context) => {
    const schedules = args.data.map((schedule) => ({
      medStaffId: schedule.medStaffId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      status: schedule.status,
    }))
    await context.prisma.schedule.createMany({
      data: schedules,
    })
    return context.prisma.schedule.findMany({
      where: {
        medStaffId: args.data[0].medStaffId,
      },
    })
  },
})

export const EditSchedule = mutationField('editSchedule', {
  type: 'Schedule',
  args: {
    id: nonNull(intArg()),
    data: nonNull(
      arg({
        type: 'EditScheduleInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    context.prisma.schedule.update({
      where: {
        id: args.id,
      },
      data: {
        startTime: args.data.startTime,
        endTime: args.data.endTime,
        status: args.data.status ?? undefined,
      },
    }),
  validate: async (rules, args, context) => {
    // check if scheduyle exists
    const sched = await context.prisma.schedule.findFirst({
      where: {
        id: args.id,
      },
    })
    if (!sched) {
      throw new Error('Schedule not found')
    }
    // throw error if startTime is after endTime
    if (args.data.startTime > args.data.endTime) {
      throw new Error('Start time must be before end time')
    }
    // throw error if start time and end time is colliding with another schedule
    // also check if the schedule is for the same medstaff
    const schedule = await context.prisma.schedule.findMany({
      where: {
        NOT: {
          id: args.id,
        },
        AND: {
          startTime: {
            lte: args.data.startTime,
          },
          endTime: {
            gte: args.data.endTime,
          },
        },
      },
    })
    if (schedule.length > 0) {
      throw new Error('Schedule is colliding with another schedule')
    }
  },
})

export const DeleteSchedule = mutationField('deleteSchedule', {
  type: 'Schedule',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.schedule.delete({
      where: {
        id: args.id,
      },
    }),
})
