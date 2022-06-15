import { MockContext, Context, createMockContext } from '../../../context'
import {
  createMedicalRecord,
  CreateMedicalRecordInputType,
} from './MedicalRecord.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

it('should create a medical record by linking existing patient and medical staff', async () => {
  const medicalRecord: CreateMedicalRecordInputType = {
    patientId: 2,
    medStaffId: 3,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  }

  mockCtx.prisma.medicalRecord.create.mockResolvedValue({
    id: 1,
    patientId: 2,
    medStaffId: 3,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  })

  await expect(createMedicalRecord(medicalRecord, ctx)).resolves.toEqual({
    id: 1,
    patientId: 2,
    medStaffId: 3,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  })

  expect(mockCtx.prisma.medicalRecord.create).toHaveBeenCalledWith({
    data: {
      patientId: 2,
      medStaffId: 3,
      date: new Date('2020-05-06T07:52:51.894Z'),
      diagnosis: 'Diabetes',
      prescription: 'Take insulin',
    },
  })
})
