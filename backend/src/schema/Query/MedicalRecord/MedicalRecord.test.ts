import { MockContext, Context, createMockContext } from '../../../context'
import {
  getMedicalRecordByPatientId,
  validateMedicalRecord,
} from './MedicalRecord.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
})

describe('MedicalRecord Query', () => {
  test('should check get medical record by patient id resolver', async () => {
    mockCtx.prisma.medicalRecord.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        diagnosis: 'test',
        prescription: 'test',
      },
    ])

    await expect(getMedicalRecordByPatientId(ctx, { id: 1 })).resolves.toEqual([
      {
        id: 1,
        patientId: 1,
        medStaffId: 1,
        date: new Date(),
        diagnosis: 'test',
        prescription: 'test',
      },
    ])

    expect(mockCtx.prisma.medicalRecord.findMany).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.medicalRecord.findMany).toHaveBeenCalledWith({
      where: {
        patientId: 1,
      },
    })
  })

  test('should check validate medical record resolver', async () => {
    mockCtx.prisma.patient.findFirst.mockResolvedValue({
      id: 1,
      address: 'USA',
      contactNum: '123456789',
      dateOfBirth: new Date(),
      firstName: 'Sam',
      lastName: 'Smith',
      sex: 'MALE',
    })

    await expect(validateMedicalRecord(ctx, { id: 1 })).resolves.toBeUndefined()

    expect(mockCtx.prisma.patient.findFirst).toHaveBeenCalledTimes(1)

    expect(mockCtx.prisma.patient.findFirst).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    })
  })

  test('should return error for the validation', async () => {
    mockCtx.prisma.patient.findFirst.mockResolvedValue(null)

    await expect(validateMedicalRecord(ctx, { id: 2 })).rejects.toThrowError(
      'Patient not found',
    )
  })
})
