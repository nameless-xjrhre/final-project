import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { BillStatusType } from '../Enums'

const HospitalBill = objectType({
  name: 'HospitalBill',
  definition(t) {
    t.field(gqlTypes.HospitalBill.id)
    t.field(gqlTypes.HospitalBill.date)
    t.field(gqlTypes.HospitalBill.deadlineDate)
    t.field(gqlTypes.HospitalBill.amount)
    t.field(gqlTypes.HospitalBill.patientId)
    t.nonNull.field('status', {
      type: BillStatusType,
    })
    t.field('patient', {
      type: 'Patient',
      resolve: (parent, _args, context) =>
        context.prisma.hospitalBill
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .patient(),
    })
    t.field('medStaff', {
      type: 'MedicalStaff',
      resolve: (parent, _args, context) =>
        context.prisma.hospitalBill
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .medStaff(),
    })
  },
})

export default HospitalBill
