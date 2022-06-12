import { Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { queryPatientById, validatePatientById } from './Patient.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01T00:00:00.000Z').getTime())
})

describe('Patient Query', () => {
  test('should check queryPatientById resolver', async () => {
    mockCtx.prisma.patient.findFirst.mockResolvedValue({
      id: 1,
      firstName: 'Sam',
      lastName: 'Smith',
      address: 'England',
      contactNum: '123456789',
      dateOfBirth: new Date(),
      sex: Sex.FEMALE,
    })

    await expect(queryPatientById(ctx, 1)).resolves.toEqual({
      id: 1,
      firstName: 'Sam',
      lastName: 'Smith',
      address: 'England',
      contactNum: '123456789',
      dateOfBirth: new Date(),
      sex: Sex.FEMALE,
    })

    expect(mockCtx.prisma.patient.findFirst).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    })
  })

  test('should check the validation if patient is null ', async () => {
    mockCtx.prisma.patient.findFirst.mockResolvedValue(null)

    await expect(validatePatientById(ctx, 1)).rejects.toThrowError(
      'Patient not found',
    )
  })

  test('should be undefined if patient exists', async () => {
    mockCtx.prisma.patient.findFirst.mockResolvedValue({
      id: 1,
      firstName: 'Sam',
      lastName: 'Smith',
      address: 'England',
      contactNum: '123456789',
      dateOfBirth: new Date(),
      sex: Sex.FEMALE,
    })

    await expect(validatePatientById(ctx, 1)).resolves.toBeUndefined()
  })
})
