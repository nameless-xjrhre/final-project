// @ts-nocheck
import { mutationField, arg, nonNull, intArg } from 'nexus'
import { createPatient, editPatient, deletePatient } from './Patient.resolver'

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
        address: rules.string().min(2).max(100),
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
  validate: async (rules, args, context) => {
    // check if patient exists
    const patient = await context.prisma.patient.findFirst({
      where: {
        id: args.id,
      },
    })
    if (!patient) {
      throw new Error(`Patient with id: ${args.id} does not exist`)
    }
    return {
      data: rules.object({
        firstName: rules.string().min(2).max(20),
        lastName: rules.string().min(2).max(20),
        address: rules.string().min(2).max(100),
      }),
    }
  },
})

export const DeletePatient = mutationField('deletePatient', {
  type: 'Patient',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => deletePatient(args.id, context),
  validate: async (rules, args, context) => {
    // check if patient exists
    const patient = await context.prisma.patient.findFirst({
      where: {
        id: args.id,
      },
    })
    if (!patient) {
      throw new Error(`Patient with id: ${args.id} does not exist`)
    }
  },
})
