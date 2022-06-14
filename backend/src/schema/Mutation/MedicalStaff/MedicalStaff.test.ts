import { MockContext, Context, createMockContext } from '../../../context'
import {
  CreateMedicalStaffType,
  createMedicalStaff,
} from './MedicalStaff.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

it('should create a medical staff', async () => {
  const medicalStaff: CreateMedicalStaffType = {
    firstName: 'George',
    lastName: 'Abaygar',
    contactNum: '123456789',
    address: 'Janiuay',
  }

  mockCtx.prisma.medicalStaff.create.mockResolvedValue({
    id: 1,
    firstName: 'George',
    lastName: 'Abaygar',
    contactNum: '123456789',
    address: 'Janiuay',
  })

  await expect(createMedicalStaff(medicalStaff, ctx)).resolves.toEqual({
    id: 1,
    firstName: 'George',
    lastName: 'Abaygar',
    contactNum: '123456789',
    address: 'Janiuay',
  })

  expect(mockCtx.prisma.medicalStaff.create).toHaveBeenCalledWith({
    data: {
      firstName: 'George',
      lastName: 'Abaygar',
      contactNum: '123456789',
      address: 'Janiuay',
    },
  })
})
