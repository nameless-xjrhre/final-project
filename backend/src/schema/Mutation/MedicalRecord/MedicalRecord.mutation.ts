import { mutationField, arg, nonNull } from 'nexus'
import { createMedicalRecord } from './MedicalRecord.resolver'

export const CreateMedicalRecord = mutationField('createMedicalRecord', {
  type: 'MedicalRecord',
  args: {
    data: nonNull(
      arg({
        type: 'CreateMedicalRecordInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createMedicalRecord(args.data, context),
})
