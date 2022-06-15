import { queryField, list, intArg, nonNull } from 'nexus'
import {
  queryTotalBillsPaid,
  queryTotalBillsUnpaid,
  queryTotalBills,
  queryBillsByPatient,
} from './HospitalBill.resolver'

// get the total bill paid
const QueryBillPaid = queryField('totalBillPaid', {
  type: 'Float',
  resolve: (_parent, _args, context) => queryTotalBillsPaid(context),
})

// get the total bill unpaid
const QueryBillUnpaidTotal = queryField('totalBillUnpaid', {
  type: 'Float',
  resolve: (_parent, _args, context) => queryTotalBillsUnpaid(context),
})

// get the total bill
const QueryBillTotal = queryField('totalBill', {
  type: 'Float',
  resolve: (_parent, _args, context) => queryTotalBills(context),
})

// get hospital bill by patient
const QueryBillsByPatient = queryField('hospitalBillsByPatient', {
  type: list('HospitalBill'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => queryBillsByPatient(context, args),
})

export default [
  QueryBillPaid,
  QueryBillUnpaidTotal,
  QueryBillTotal,
  QueryBillsByPatient,
]
