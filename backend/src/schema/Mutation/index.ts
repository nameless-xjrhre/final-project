import { CreateSchedule } from './Schedule'
import { CreateMedicalStaff } from './MedicalStaff'
import { CreateAppointment } from './Appointment'
import PatientMutations from './Patient'
import { CreateUser } from './User'

export default [
  CreateSchedule,
  CreateMedicalStaff,
  CreateAppointment,
  ...PatientMutations,
  CreateUser,
]
