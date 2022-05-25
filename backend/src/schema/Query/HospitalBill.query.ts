import { queryField } from 'nexus'

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

export default [QueryBillPaid, QueryBillUnpaidTotal, QueryBillTotal]
