import _ from 'lodash'
import { Appointment, VisitType, AppointmentStatus, Sex } from '@prisma/client'
import { MockContext, Context, createMockContext } from '../../../context'
import {
  CreateAppointmentType,
  createAppointment,
  EditAppointmentType,
  editAppointment,
  createAppointmentWithPatient,
  deleteAppointment,
} from '../Appointment/Appointment.resolver'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
})

it('should create an appointment by linking existing patient and medical staff', async () => {
  const appointment: CreateAppointmentType = {
    date: new Date(),
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
  }

  const expectedAppointment: Appointment = {
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 2,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.create.mockResolvedValue(expectedAppointment)

  await expect(createAppointment(appointment, 2, 1, ctx)).resolves.toEqual({
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 2,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  })

  expect(mockCtx.prisma.appointment.create).toHaveBeenCalledTimes(1)

  expect(mockCtx.prisma.appointment.create).toHaveBeenCalledWith({
    data: {
      visitType: VisitType.ROUTINE,
      date: new Date(),
      note: appointment.note,
      status: AppointmentStatus.PENDING,
      medStaffId: 2,
      patientId: 1,
    },
  })
})

it('should create an appointment by inputing patient information', async () => {
  mockCtx.prisma.patient.create.mockResolvedValue({
    id: 1,
    firstName: 'Jun',
    lastName: 'Secula',
    sex: Sex.MALE,
    dateOfBirth: new Date(),
    contactNum: '12345',
    address: 'Janiuay',
  })

  mockCtx.prisma.appointment.create.mockResolvedValue({
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 2,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  })

  await expect(
    createAppointmentWithPatient(
      {
        visitType: VisitType.ROUTINE,
        date: new Date(),
        note: 'Rest More',
        status: AppointmentStatus.PENDING,
      },
      {
        firstName: 'Jun',
        lastName: 'Secula',
        sex: Sex.MALE,
        dateOfBirth: new Date(),
        contactNum: '12345',
        address: 'Janiuay',
      },
      2,
      ctx,
    ),
  ).resolves.toEqual({
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 2,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  })

  expect(mockCtx.prisma.appointment.create).toHaveBeenCalledWith({
    data: {
      visitType: VisitType.ROUTINE,
      date: new Date(),
      note: 'Rest More',
      status: AppointmentStatus.PENDING,
      medStaffId: 2,
      patientId: 1,
    },
  })

  expect(mockCtx.prisma.patient.create).toHaveBeenCalledWith({
    data: {
      firstName: 'Jun',
      lastName: 'Secula',
      sex: Sex.MALE,
      dateOfBirth: new Date(),
      contactNum: '12345',
      address: 'Janiuay',
    },
  })
})

it('should edit an appointment', async () => {
  const appointment: EditAppointmentType = {
    date: new Date(),
    note: 'Rest More',
    status: 'PENDING',
    visitType: VisitType.FOLLOWUP,
  }

  const expectedAppointment: Appointment = {
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.update.mockResolvedValue(expectedAppointment)

  const data = _.pickBy(
    {
      visitType: VisitType.FOLLOWUP,
      date: new Date(),
      note: 'Rest More',
      status: AppointmentStatus.PENDING,
    },
    _.identity,
  )

  await expect(editAppointment(1, appointment, ctx)).resolves.toEqual(
    expectedAppointment,
  )

  expect(mockCtx.prisma.appointment.update).toHaveBeenCalledTimes(1)

  expect(mockCtx.prisma.appointment.update).toHaveBeenCalledWith({
    where: {
      id: 1,
    },
    data,
  })
})

it('should delete an appointment', async () => {
  const appointment = {
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  }

  mockCtx.prisma.appointment.delete.mockResolvedValue(appointment)

  await expect(
    ctx.prisma.appointment.delete({
      where: { id: 1 },
    }),
  ).resolves.toEqual(appointment)

  expect(mockCtx.prisma.appointment.delete).toHaveBeenCalledTimes(1)

  expect(mockCtx.prisma.appointment.delete).toHaveBeenCalledWith({
    where: { id: 1 },
  })
})

test('shold delete appointments', async () => {
  mockCtx.prisma.appointment.delete.mockResolvedValue({
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  })

  await expect(deleteAppointment(1, ctx)).resolves.toEqual({
    id: 1,
    date: new Date(),
    note: 'Rest More',
    visitType: VisitType.ROUTINE,
    status: AppointmentStatus.PENDING,
    medStaffId: 1,
    patientId: 1,
    hospitalBillId: 1,
    createdAt: new Date(),
    updatedAt: new Date('2020-02-01'),
  })

  expect(mockCtx.prisma.appointment.delete).toHaveBeenCalledTimes(1)

  expect(mockCtx.prisma.appointment.delete).toHaveBeenCalledWith({
    where: { id: 1 },
  })
})
