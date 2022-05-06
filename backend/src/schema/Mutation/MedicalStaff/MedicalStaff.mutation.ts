import { mutationField, arg, nonNull } from 'nexus'

export const CreateMedicalStaff = mutationField('createMedicalStaff', {
  type: 'MedicalStaff',
  args: {
    data: nonNull(
      arg({
        type: 'CreateMedicalStaffInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    context.prisma.medicalStaff.create({
      data: {
        firstName: args.data.firstName,
        lastName: args.data.lastName,
        contactNum: args.data.contactNum,
        address: args.data.address,
      },
    }),
})
