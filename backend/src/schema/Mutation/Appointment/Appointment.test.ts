import { Sex, Appointment, VisitType, AppointmentStatus } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import { createPatient } from '../Patient/Patient.resolver'
import { createMedicalStaff } from '../MedicalStaff/MedicalStaff.resolver'
import {
  CreateAppointmentType,
  createAppointment,
  EditAppointmentType,
  editAppointment,
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
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.create.mockResolvedValue(expectedAppointment)

  await expect(createAppointment(appointment, 1, 1, ctx)).resolves.toEqual(
    expectedAppointment,
  )
})

it('should edit an appointment', async () => {
  const appointment: EditAppointmentType = {
    date: new Date('2020-01-01'),
    note: 'Rest More',
    status: 'PENDING',
  }

  const expectedAppointment: Appointment = {
    id: 1,
    date: new Date('2020-01-01'),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.update.mockResolvedValue(expectedAppointment)

  await expect(editAppointment(1, appointment, ctx)).resolves.toEqual(
    expectedAppointment,
  )
})

it('should delete an appointment', async () => {
  const appointment = {
    id: 1,
    date: new Date('2020-01-01'),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.delete.mockResolvedValue(appointment)

  await expect(
    ctx.prisma.appointment.delete({
      where: { id: 1 },
    }),
  ).resolves.toEqual(appointment)
})
