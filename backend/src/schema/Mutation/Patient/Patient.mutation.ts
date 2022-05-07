import { mutationField, arg, nonNull } from 'nexus'
import { createPatient } from './Patient.resolver'

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
    // first name must be at least 2 characters
    if (args.data.firstName.length < 2) {
      throw new Error('First name must be at least 2 characters')
    }
    // last name must be at least 2 characters
    if (args.data.lastName.length < 2) {
      throw new Error('Last name must be at least 2 characters')
    }
    // first + " " + last name must not be in the database
    const patient = await context.prisma.patient.findFirst({
      where: {
        AND: [
          {
            firstName: args.data.firstName,
          },
          {
            lastName: args.data.lastName,
          },
        ],
      },
    })
    if (patient) {
      throw new Error('First name + Last name is already in the database')
    }
  },
})
