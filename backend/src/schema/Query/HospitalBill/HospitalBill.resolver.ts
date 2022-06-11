import { Context } from '../../../context'

export async function queryTotalBillsPaid(ctx: Context) {
  const bills = await ctx.prisma.hospitalBill.aggregate({
    where: {
      status: 'PAID',
    },
    _sum: {
      amount: true,
    },
  })
  return bills._sum.amount
}

export async function queryTotalBillsUnpaid(ctx: Context) {
  const bills = await ctx.prisma.hospitalBill.aggregate({
    where: {
      status: 'UNPAID',
    },
    _sum: {
      amount: true,
    },
  })
  return bills._sum.amount
}

export async function queryTotalBills(ctx: Context) {
  const bills = await ctx.prisma.hospitalBill.aggregate({
    _sum: {
      amount: true,
    },
  })
  return bills._sum.amount
}

export async function queryBillsByPatient(ctx: Context, args: { id: number }) {
  return ctx.prisma.hospitalBill.findMany({
    where: {
      patientId: args.id,
    },
  })
}
