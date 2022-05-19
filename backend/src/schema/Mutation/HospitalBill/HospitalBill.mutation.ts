import { mutationField, arg, nonNull, intArg } from 'nexus'
import { createHospitalBill, editHospitalBill } from './HospitalBill.resolver'

export const CreateHospitalBill = mutationField('createHospitalBill', {
  type: 'HospitalBill',
  args: {
    data: nonNull(
      arg({
        type: 'CreateHospitalBillInput',
      }),
    ),
  },
  resolve: (parent, args, context) => createHospitalBill(args.data, context),
  validate: async (parent, args, context) => {
    // throw if patient does not exist

    const patient = await context.prisma.patient.findFirst({
      where: {
        id: args.data.patientId,
      },
    })

    if (!patient) {
      throw new Error(`Patient with does not exist`)
    }

    // date cannot be before today
    if (args.data.date < new Date()) {
      throw new Error('Date cannot be before today')
    }
  },
})

export const EditHospitalBill = mutationField('editHospitalBill', {
  type: 'HospitalBill',
  args: {
    id: nonNull(intArg()),
    data: nonNull(
      arg({
        type: 'EditHospitalBillInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    editHospitalBill(args.id, args.data, context),
})
