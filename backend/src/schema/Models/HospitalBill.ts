import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { BillStatusType } from '../Enums'

const HospitalBill = objectType({
  name: 'HospitalBill',
  definition(t) {
    t.field(gqlTypes.HospitalBill.id)
    t.field(gqlTypes.HospitalBill.date)
    t.field(gqlTypes.HospitalBill.amount)
    t.field('status', {
      type: BillStatusType,
    })
    t.field('patient', {
      type: 'Patient',
      resolve: (parent, _args, context) =>
        context.prisma.patient.findFirst({
          where: {
            id: parent.id,
          },
        }),
    })
  },
})

export default HospitalBill
