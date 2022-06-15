import { MockContext, Context, createMockContext } from '../../../context'
import { availableStaffs } from './MedicalStaff.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('MedicalStaff Query', () => {
  test('should check available staffs resolver', async () => {
    mockCtx.prisma.medicalStaff.findMany.mockResolvedValue([
      {
        id: 1,
        firstName: 'Sam',
        lastName: 'Smith',
        address: 'USA',
        contactNum: '123456789',
      },
    ])

    await expect(availableStaffs(ctx)).resolves.toEqual([
      {
        id: 1,
        firstName: 'Sam',
        lastName: 'Smith',
        address: 'USA',
        contactNum: '123456789',
      },
    ])

    expect(mockCtx.prisma.medicalStaff.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.medicalStaff.findMany).toHaveBeenCalledWith({
      where: {
        schedules: {
          some: {
            status: 'OPEN',
          },
        },
      },
    })
  })
})
