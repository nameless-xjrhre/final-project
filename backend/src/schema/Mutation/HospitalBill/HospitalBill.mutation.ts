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
