import { MockContext, Context, createMockContext } from '../../../context'
import {
  queryTotalBillsPaid,
  queryTotalBillsUnpaid,
  queryTotalBills,
  queryBillsByPatient,
} from './HospitalBill.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
})

describe('HospitalBill Query', () => {
  test('should check total bills paid resolver', async () => {
    mockCtx.prisma.hospitalBill.aggregate.mockResolvedValue({
      _sum: {
        amount: 100,
      },
      _avg: {
        amount: 50,
      },
      _count: {
        amount: 2,
      },
      _max: {
        amount: 100,
      },
      _min: {
        amount: 50,
      },
    })

    await expect(queryTotalBillsPaid(ctx)).resolves.toBe(100)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledWith({
      where: {
        status: 'PAID',
      },
      _sum: {
        amount: true,
      },
    })
  })

  test('should check total bills unpaid resolver', async () => {
    mockCtx.prisma.hospitalBill.aggregate.mockResolvedValue({
      _sum: {
        amount: 100,
      },
      _avg: {
        amount: 50,
      },
      _count: {
        amount: 2,
      },
      _max: {
        amount: 100,
      },
      _min: {
        amount: 50,
      },
    })

    await expect(queryTotalBillsUnpaid(ctx)).resolves.toBe(100)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledWith({
      where: {
        status: 'UNPAID',
      },
      _sum: {
        amount: true,
      },
    })
  })

  test('should check total bills resolver', async () => {
    mockCtx.prisma.hospitalBill.aggregate.mockResolvedValue({
      _sum: {
        amount: 100,
      },
      _avg: {
        amount: 50,
      },
      _count: {
        amount: 2,
      },
      _max: {
        amount: 100,
      },
      _min: {
        amount: 50,
      },
    })

    await expect(queryTotalBills(ctx)).resolves.toBe(100)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.hospitalBill.aggregate).toHaveBeenCalledWith({
      _sum: {
        amount: true,
      },
    })
  })

  test('should check bills by patient resolver', async () => {
    mockCtx.prisma.hospitalBill.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        status: 'UNPAID',
        amount: 100,
        deadlineDate: new Date(),
      },
      {
        id: 2,
        patientId: 1,
        medStaffId: 2,
        date: new Date(),
        status: 'PAID',
        amount: 200,
        deadlineDate: new Date(),
      },
    ])

    await expect(queryBillsByPatient(ctx, { id: 1 })).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        status: 'UNPAID',
        amount: 100,
        deadlineDate: new Date(),
      },
      {
        id: 2,
        patientId: 1,
        medStaffId: 2,
        date: new Date(),
        status: 'PAID',
        amount: 200,
        deadlineDate: new Date(),
      },
    ])

    expect(mockCtx.prisma.hospitalBill.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.hospitalBill.findMany).toHaveBeenCalledWith({
      where: {
        patientId: 1,
      },
    })
  })

  test('should check bills by patient resolver', async () => {
    mockCtx.prisma.hospitalBill.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        status: 'UNPAID',
        amount: 100,
        deadlineDate: new Date(),
      },
      {
        id: 2,
        patientId: 1,
        medStaffId: 2,
        date: new Date(),
        status: 'PAID',
        amount: 200,
        deadlineDate: new Date(),
      },
    ])

    await expect(queryBillsByPatient(ctx, { id: 1 })).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        status: 'UNPAID',
        amount: 100,
        deadlineDate: new Date(),
      },
      {
        id: 2,
        patientId: 1,
        medStaffId: 2,
        date: new Date(),
        status: 'PAID',
        amount: 200,
        deadlineDate: new Date(),
      },
    ])

    expect(mockCtx.prisma.hospitalBill.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.hospitalBill.findMany).toHaveBeenCalledWith({
      where: {
        patientId: 1,
      },
    })
  })
})
