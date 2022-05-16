import { mutationField, arg, nonNull } from 'nexus'

export const CreateSchedule = mutationField('createSchedule', {
  type: 'Schedule',
  args: {
    data: nonNull(
      arg({
        type: 'CreateScheduleInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    context.prisma.schedule.create({
      data: {
        medStaffId: args.data.medStaffId,
        startTime: args.data.startTime,
        endTime: args.data.endTime,
      },
    }),
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
