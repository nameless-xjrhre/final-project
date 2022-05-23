import { mutationField, arg, nonNull } from 'nexus'

export const CreateMedicalRecord = mutationField('createMedicalRecord', {
  type: 'MedicalRecord',
  args: {
    data: nonNull(
      arg({
        type: 'CreateMedicalRecordInput',
      }),
    ),
  },
  resolve: (_parent, args, context) =>
    context.prisma.medicalRecord.create({
      data: {
        patientId: args.data.patientId,
        medStaffId: args.data.medStaffId,
        date: args.data.date,
        diagnosis: args.data.diagnosis,
        prescription: args.data.prescription,
      },
    }),
})
