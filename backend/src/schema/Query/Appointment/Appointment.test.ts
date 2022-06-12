import { MockContext, Context, createMockContext } from '../../../context'
import {
  queryDoneAppointments,
  queryTotalAppointments,
  queryPastAppointments,
  queryUpcomingAppointments,
  queryAppointmentsRange,
} from './Appointment.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
})

describe('Appointments Query', () => {
  test('should check done appointments resolver', async () => {
    mockCtx.prisma.appointment.count.mockResolvedValue(1)

    await expect(queryDoneAppointments(ctx)).resolves.toBe(1)

    expect(mockCtx.prisma.appointment.count).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.appointment.count).toHaveBeenCalledWith({
      where: {
        status: 'DONE',
      },
    })
  })

  test('should check total appointments resolver', async () => {
    mockCtx.prisma.appointment.count.mockResolvedValue(2)

    await expect(queryTotalAppointments(ctx)).resolves.toBe(2)

    expect(mockCtx.prisma.appointment.count).toHaveBeenCalledTimes(1)
  })

  test('should check past appointments resolver', async () => {
    mockCtx.prisma.appointment.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 1,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])

    await expect(queryPastAppointments(ctx, { id: 1 })).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 1,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledWith({
      where: {
        patientId: 1,
        date: {
          lt: new Date(),
        },
      },
    })
  })

  test('should check upcoming appointments resolver', async () => {
    mockCtx.prisma.appointment.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 1,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])
    expect(queryUpcomingAppointments(ctx, { id: 1 })).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 1,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledWith({
      where: {
        patientId: 1,
        date: {
          gt: new Date(),
        },
      },
    })
  })

  test('should check appointments range resolver', async () => {
    mockCtx.prisma.appointment.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 2,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])
    expect(
      queryAppointmentsRange(ctx, { count: 10, start: 10 }),
    ).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        hospitalBillId: 1,
        medStaffId: 1,
        date: new Date(),
        visitType: 'FOLLOWUP',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 1',
      },
      {
        id: 2,
        patientId: 2,
        hospitalBillId: 2,
        medStaffId: 2,
        date: new Date(),
        visitType: 'URGENT',
        status: 'EXPIRED',
        createdAt: new Date(),
        updatedAt: new Date(),
        note: 'Sample 2',
      },
    ])

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.appointment.findMany).toHaveBeenCalledWith({
      skip: 10,
      take: 10,
      orderBy: {
        id: 'asc',
      },
    })
  })
})
