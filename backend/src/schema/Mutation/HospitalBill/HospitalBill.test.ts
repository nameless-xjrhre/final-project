import { Sex, HospitalBill, BillStatus } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import {
  EditHospitalBillInputType,
  HospitalBillInputType,
  createHospitalBill,
  editHospitalBill,
} from './HospitalBill.resolver'
import { createPatient } from '../Patient/Patient.resolver'
import { createMedicalStaff } from '../MedicalStaff/MedicalStaff.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

it('should create a hospital bill by linking existing patient and medical staff', async () => {
  const patient = {
    firstName: 'George',
    lastName: 'Abaygar',
    sex: Sex.MALE,
    dateOfBirth: new Date('2000-05-06T07:52:51.894Z'),
    address: 'Janiuay',
    contactNum: '123456789',
  }

  await createPatient(patient, ctx)

  const medStaff = {
    firstName: 'Jose',
    lastName: 'Rizal',
    contactNum: '342323342',
    address: 'Laguna',
  }

  await createMedicalStaff(medStaff, ctx)

  const hospitalBill: HospitalBillInputType = {
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-01-01'),
    patientId: 1,
  }

  const expectedHospitalBill: HospitalBill = {
    id: 1,
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-01-01'),
    patientId: 1,
  }

  mockCtx.prisma.hospitalBill.create.mockResolvedValue(expectedHospitalBill)
  const result = await createHospitalBill(hospitalBill, 1, ctx)
  expect(result).toEqual(expectedHospitalBill)
})

it('should edit a hospital bill by linking existing patient and medical staff', async () => {
  const patient = {
    firstName: 'George',
    lastName: 'Abaygar',
    sex: Sex.MALE,
    dateOfBirth: new Date('2000-05-06T07:52:51.894Z'),
    address: 'Janiuay',
    contactNum: '123456789',
  }

  await createPatient(patient, ctx)

  const medStaff = {
    firstName: 'Jose',
    lastName: 'Rizal',
    contactNum: '342323342',
    address: 'Laguna',
  }

  await createMedicalStaff(medStaff, ctx)

  const hospitalBill: HospitalBillInputType = {
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-01-01'),
    patientId: 1,
  }

  const expectedHospitalBill: HospitalBill = {
    id: 1,
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-01-01'),
    patientId: 1,
  }

  mockCtx.prisma.hospitalBill.create.mockResolvedValue(expectedHospitalBill)
  await createHospitalBill(hospitalBill, 1, ctx)

  const editHospitalBillInput: EditHospitalBillInputType = {
    deadlineDate: new Date('2020-01-01'),
    date: new Date('2020-01-01'),
    status: BillStatus.UNPAID,
    amount: 100,
  }

  const expectedEditedHospitalBill: HospitalBill = {
    id: 1,
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-01-01'),
    patientId: 1,
  }

  mockCtx.prisma.hospitalBill.update.mockResolvedValue(
    expectedEditedHospitalBill,
  )
  const result2 = await editHospitalBill(1, editHospitalBillInput, ctx)
  expect(result2).toEqual(expectedEditedHospitalBill)
})
