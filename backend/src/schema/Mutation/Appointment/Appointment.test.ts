import { Sex, Appointment } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createPatient } from '../Patient/Patient.resolver'
import { createMedicalStaff } from '../MedicalStaff/MedicalStaff.resolver'
import {
  CreateAppointmentType,
  createAppointment,
} from '../Appointment/Appointment.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create an appointment by linking existing patient and medical staff', async () => {
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

  const appointment: CreateAppointmentType = {
    date: new Date('2020-01-01'),
    visitType: 'URGENT',
    status: 'PENDING',
  }

  const expectedAppointment: Appointment = {
    id: 1,
    date: new Date('2020-01-01'),
    note: 'Rest More',
    visitType: 'ROUTINE',
    status: 'PENDING',
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
  }

  mockCtx.prisma.appointment.create.mockResolvedValue(expectedAppointment)

  await expect(createAppointment(appointment, 1, 1, ctx)).resolves.toEqual(
    expectedAppointment,
  )
})
