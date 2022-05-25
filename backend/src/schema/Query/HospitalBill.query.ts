import { queryField, list, intArg, nonNull } from 'nexus'

// get the total bill paid
const QueryBillPaid = queryField('totalBillPaid', {
  type: 'Float',
  resolve: (_parent, _args, context) =>
    context.prisma.hospitalBill
      .aggregate({
        where: {
          status: 'PAID',
        },
        _sum: {
          amount: true,
        },
      })
      .then((bills) => bills._sum.amount),
})

// get the total bill unpaid
const QueryBillUnpaidTotal = queryField('totalBillUnpaid', {
  type: 'Float',
  resolve: (_parent, _args, context) =>
    context.prisma.hospitalBill
      .aggregate({
        where: {
          status: 'UNPAID',
        },
        _sum: {
          amount: true,
        },
      })
      .then((bills) => bills._sum.amount),
})

// get the total bill
const QueryBillTotal = queryField('totalBill', {
  type: 'Float',
  resolve: (_parent, _args, context) =>
    context.prisma.hospitalBill
      .aggregate({
        _sum: {
          amount: true,
        },
      })
      .then((bills) => bills._sum.amount),
})

// get hospital bill by patient
const QueryBillsByPatient = queryField('hospitalBillsByPatient', {
  type: list('HospitalBill'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.hospitalBill.findMany({
      where: {
        patientId: args.id,
      },
    }),
})

export default [
  QueryBillPaid,
  QueryBillUnpaidTotal,
  QueryBillTotal,
  QueryBillsByPatient,
]
