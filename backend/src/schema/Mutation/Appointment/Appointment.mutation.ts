import { mutationField, arg, nonNull, intArg } from 'nexus'
import {
  createAppointment,
  createAppointmentWithPatient,
  editAppointment,
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
    validate: async (rules, args, context) => {
      const { medStaffId, patient } = args
      // check if medstaff exists
      const medStaff = await context.prisma.medicalStaff.findFirst({
        where: {
          id: medStaffId,
        },
      })

      if (!medStaff) {
        throw new Error(`Medstaff does not exist`)
      }

      // check if patient.firstName + " " + patient.lastName exists
      const existingPatient = await context.prisma.patient.findFirst({
        where: {
          firstName: patient.firstName,
          lastName: patient.lastName,
        },
      })
      if (existingPatient) {
        throw new Error(
          `Patient with firstName: ${patient.firstName} and lastName: ${patient.lastName} already exists`,
        )
      }

      return {
        appointment: rules.object({
          date: rules.date(),
          description: rules.string().min(5).max(100),
        }),
        patient: rules.object({
          firstName: rules.string().min(2).max(20),
          lastName: rules.string().min(2).max(20),
          address: rules.string().min(2).max(100),
        }),
      }
    },
  },
)

export const EditAppointment = mutationField('editAppointment', {
  type: 'Appointment',
  args: {
    id: nonNull(intArg()),
    data: nonNull(
      arg({
        type: 'EditAppointmentInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    editAppointment(args.id, args.data, context),
})
