import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { SexType, StatusType } from '../Enums'

const CreatePatientInput = inputObjectType({
  name: 'CreatePatientInput',
  definition(t) {
    t.field(gqlTypes.Patient.firstName)
    t.field(gqlTypes.Patient.lastName)
    t.nonNull.field('sex', {
      type: SexType,
    })
    t.field(gqlTypes.Patient.dateOfBirth)
    t.field(gqlTypes.Patient.contactNum)
    t.field(gqlTypes.Patient.address)
  },
})

const CreateAppointmentInput = inputObjectType({
  name: 'CreateAppointmentInput',
  definition(t) {
    t.field(gqlTypes.Appointment.visitType)
    t.field(gqlTypes.Appointment.date)
    t.nonNull.field('status', {
      type: StatusType,
    })
    t.field(gqlTypes.Appointment.patientId)
    t.field(gqlTypes.Appointment.medStaffId)
  },
})

const CreateScheduleInput = inputObjectType({
  name: 'CreateScheduleInput',
  definition(t) {
    t.field(gqlTypes.Schedule.medStaffId)
    t.field(gqlTypes.Schedule.startTime)
    t.field(gqlTypes.Schedule.endTime)
  },
})

const CreateMedicalStaffInput = inputObjectType({
  name: 'CreateMedicalStaffInput',
  definition(t) {
    t.field(gqlTypes.MedicalStaff.firstName)
    t.field(gqlTypes.MedicalStaff.lastName)
    t.field(gqlTypes.MedicalStaff.contactNum)
    t.field(gqlTypes.MedicalStaff.address)
  },
})

export default [
  CreatePatientInput,
  CreateAppointmentInput,
  CreateScheduleInput,
  CreateMedicalStaffInput,
]