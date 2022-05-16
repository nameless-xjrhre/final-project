import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { BillStatusType } from '../Enums'

const CreateHospitalBillInput = inputObjectType({
  name: 'CreateHospitalBillInput',
  definition(t) {
    t.field(gqlTypes.HospitalBill.patientId)
    t.field(gqlTypes.HospitalBill.date)
    t.field(gqlTypes.HospitalBill.amount)
    t.nonNull.field('status', {
      type: BillStatusType,
    })
  },
})

const EditHospitalBillInput = inputObjectType({
  name: 'EditHospitalBillInput',
  definition(t) {
    t.date('date')
    t.int('amount')
    t.field('status', {
      type: BillStatusType,
    })
  },
})

export default [CreateHospitalBillInput, EditHospitalBillInput]
