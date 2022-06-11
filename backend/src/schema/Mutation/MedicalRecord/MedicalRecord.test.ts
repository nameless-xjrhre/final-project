import { Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import {
  createMedicalRecord,
  CreateMedicalRecordInputType,
} from './MedicalRecord.resolver'
import { createPatient } from '../Patient/Patient.resolver'
import { createMedicalStaff } from '../MedicalStaff/MedicalStaff.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

it('should create a medical record by linking existing patient and medical staff', async () => {
  const patient = {
    id: 1,
    firstName: 'George',
    lastName: 'Abaygar',
    sex: Sex.MALE,
    dateOfBirth: new Date('2000-05-06T07:52:51.894Z'),
    address: 'Janiuay',
    contactNum: '123456789',
  }

  await createPatient(patient, ctx)

  const medStaff = {
    id: 1,
    firstName: 'Jose',
    lastName: 'Rizal',
    contactNum: '342323342',
    address: 'Laguna',
  }

  await createMedicalStaff(medStaff, ctx)

  const medicalRecord: CreateMedicalRecordInputType = {
    patientId: patient.id,
    medStaffId: medStaff.id,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  }

  mockCtx.prisma.medicalRecord.create.mockResolvedValue({
    id: 1,
    patientId: patient.id,
    medStaffId: medStaff.id,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  })

  await expect(createMedicalRecord(medicalRecord, ctx)).resolves.toEqual({
    id: 1,
    patientId: patient.id,
    medStaffId: medStaff.id,
    date: new Date('2020-05-06T07:52:51.894Z'),
    diagnosis: 'Diabetes',
    prescription: 'Take insulin',
  })
})
