import { mutationField, arg, nonNull, intArg } from 'nexus'
import { createPatient, editPatient } from './Patient.resolver'

export const CreatePatient = mutationField('createPatient', {
  type: 'Patient',
  args: {
    data: nonNull(
      arg({
        type: 'CreatePatientInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createPatient(args.data, context),
  validate: async (rules, args, context) => {
    const { firstName, lastName } = args.data

    const existingPatient = await context.prisma.patient.findFirst({
      where: {
        firstName,
        lastName,
      },
    })
    if (existingPatient) {
      throw new Error(
        `Patient with firstName: ${firstName} and lastName: ${lastName} already exists`,
      )
    }
    return {
      data: rules.object({
        firstName: rules.string().min(2).max(20),
        lastName: rules.string().min(2).max(20),
      }),
    }
  },
})

export const EditPatient = mutationField('editPatient', {
  type: 'Patient',
  args: {
    id: nonNull(intArg()),
    data: nonNull(
      arg({
        type: 'EditPatientInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => editPatient(args.id, args.data, context),
})
