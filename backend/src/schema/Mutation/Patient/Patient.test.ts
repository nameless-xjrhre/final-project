import { Patient, Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createPatient } from './Patient.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create a patient', async () => {
  const patient: Patient = {
    id: 1,
    firstName: 'Larri',
    lastName: 'Lamanosa',
    sex: Sex.MALE,
    dateOfBirth: new Date('2020-01-01'),
    contactNum: '1234567890',
    address: '123 Main St',
  }

  mockCtx.prisma.patient.create.mockResolvedValue(patient)

  const input = {
    firstName: 'Larri',
    lastName: 'Lamanosa',
    sex: Sex.MALE,
    dateOfBirth: new Date('2020-01-01'),
    contactNum: '1234567890',
    address: '123 Main St',
  }

  await expect(createPatient(input, ctx)).resolves.toEqual(patient)
})
