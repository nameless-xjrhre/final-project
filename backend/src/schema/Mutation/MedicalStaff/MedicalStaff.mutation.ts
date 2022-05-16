import { mutationField, arg, nonNull } from 'nexus'
import { createMedicalStaff } from './MedicalStaff.resolver'

export const CreateMedicalStaff = mutationField('createMedicalStaff', {
  type: 'MedicalStaff',
  args: {
    data: nonNull(
      arg({
        type: 'CreateMedicalStaffInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createMedicalStaff(args.data, context),
})
