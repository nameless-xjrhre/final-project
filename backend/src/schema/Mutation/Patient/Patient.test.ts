import { Patient, Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createPatient, editPatient, deletePatient } from './Patient.resolver'

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

  const input = {
    sex: Sex.MALE,
  }

  await expect(editPatient(1, input, ctx)).resolves.toEqual(patient)
})

test('should delete a patient', async () => {
  const patient: Patient = {
    id: 1,
    firstName: 'Larri',
    lastName: 'Lamanosa',
    sex: Sex.MALE,
    dateOfBirth: new Date('2020-01-01'),
    contactNum: '1234567890',
    address: '123 Main St',
  }

  await createPatient(
    {
      ...patient,
      sex: Sex.FEMALE,
    },
    ctx,
  )

  mockCtx.prisma.patient.delete.mockResolvedValue(patient)

  await expect(deletePatient(1, ctx)).resolves.toEqual(patient)
})
