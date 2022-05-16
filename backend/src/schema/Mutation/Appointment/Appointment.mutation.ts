import { mutationField, arg, nonNull } from 'nexus'

export const CreateAppointment = mutationField('createAppointment', {
  type: 'Appointment',
  args: {
    data: nonNull(
      arg({
        type: 'CreateAppointmentInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    context.prisma.appointment.create({
      data: {
        visitType: args.data.visitType,
        date: args.data.date,
        status: args.data.status,
        medStaffId: args.data.medStaffId,
        patientId: args.data.patientId,
      },
    }),
})
