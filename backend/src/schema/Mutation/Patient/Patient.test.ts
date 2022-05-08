import { Patient, Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createPatient, editPatient, EditPatient } from './Patient.resolver'

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

test('should edit patient', async () => {
  const patient: Patient = {
    id: 1,
    firstName: 'Larri',
    lastName: 'Lamanosa',
    sex: Sex.MALE,
    dateOfBirth: new Date('2020-01-01'),
    contactNum: '1234567890',
    address: '123 Main St',
  }

  mockCtx.prisma.patient.update.mockResolvedValue(patient)

  await createPatient(
    {
      ...patient,
      sex: Sex.FEMALE,
    },
    ctx,
  )

  const input: EditPatient = {
    sex: Sex.MALE,
  }

  await expect(editPatient(1, input, ctx)).resolves.toEqual(patient)
})

test('should throw error if edit details is empty', async () => {
  const input = {
    firstName: 'Larri',
    lastName: 'Lamanosa',
    sex: Sex.MALE,
    dateOfBirth: new Date('2020-01-01'),
    contactNum: '1234567890',
    address: '123 Main St',
  }

  mockCtx.prisma.patient.create.mockResolvedValue({
    id: 1,
    ...input,
  })

  await createPatient(input, ctx)

  await expect(editPatient(1, {}, ctx)).rejects.toThrowError('No data provided')
})
