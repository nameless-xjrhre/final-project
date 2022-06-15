import { HospitalBill, BillStatus } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import {
  EditHospitalBillInputType,
  HospitalBillInputType,
  createHospitalBill,
  editHospitalBill,
} from './HospitalBill.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

it('should create a hospital bill by linking existing patient and medical staff', async () => {
  const hospitalBill: HospitalBillInputType = {
    medStaffId: 2,
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

  const result = await createHospitalBill(hospitalBill, 10, ctx)

  expect(result).toEqual(expectedHospitalBill)

  expect(mockCtx.prisma.hospitalBill.create).toHaveBeenCalledWith({
    data: {
      medStaffId: 2,
      deadlineDate: new Date('2020-01-01'),
      amount: 100,
      status: BillStatus.UNPAID,
      date: new Date('2020-01-01'),
      patientId: 1,
    },
  })

  expect(mockCtx.prisma.appointment.update).toHaveBeenCalledWith({
    where: {
      id: 10,
    },
    data: {
      hospitalBillId: 1,
    },
  })
})

it('should edit a hospital bill by linking existing patient and medical staff', async () => {
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

  expect(mockCtx.prisma.hospitalBill.update).toHaveBeenCalledWith({
    where: {
      id: 1,
    },
    data: {
      deadlineDate: new Date('2020-01-01'),
      date: new Date('2020-01-01'),
      status: BillStatus.UNPAID,
      amount: 100,
    },
  })
})

it('should update the hospital bill status even if some data fields are missing', async () => {
  const editHospitalBillInput: EditHospitalBillInputType = {
    deadlineDate: new Date('2020-01-01'),
    date: new Date('2020-02-01'),
  }

  mockCtx.prisma.hospitalBill.update.mockResolvedValue({
    id: 1,
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-02-01'),
    patientId: 1,
  })

  const edittedBill = await editHospitalBill(1, editHospitalBillInput, ctx)

  expect(edittedBill).toEqual({
    id: 1,
    medStaffId: 1,
    deadlineDate: new Date('2020-01-01'),
    amount: 100,
    status: BillStatus.UNPAID,
    date: new Date('2020-02-01'),
    patientId: 1,
  })

  expect(mockCtx.prisma.hospitalBill.update).toHaveBeenCalledWith({
    where: {
      id: 1,
    },
    data: {
      deadlineDate: new Date('2020-01-01'),
      date: new Date('2020-02-01'),
    },
  })
})
