import { mutationField, arg, nonNull, intArg } from 'nexus'
import {
  createAppointment,
  createAppointmentWithPatient,
} from './Appointment.resolver'

export const CreateAppointment = mutationField('createAppointment', {
  type: 'Appointment',
  args: {
    data: nonNull(
      arg({
        type: 'CreateAppointmentInput',
      }),
    ),
    medStaffId: nonNull(intArg()),
    patientId: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    createAppointment(args.data, args.medStaffId, args.patientId, context),
})

export const CreateAppointmentWithPatient = mutationField(
  'createAppointmentWithPatient',
  {
    type: 'Appointment',
    args: {
      appointment: nonNull(
        arg({
          type: 'CreateAppointmentInput',
        }),
      ),
      patient: nonNull(
        arg({
          type: 'CreatePatientInput',
        }),
      ),
      medStaffId: nonNull(intArg()),
    },
    resolve: async (_parent, args, context) =>
      createAppointmentWithPatient(
        args.appointment,
        args.patient,
        args.medStaffId,
        context,
      ),
  },
)
