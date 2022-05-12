import { CreateSchedule } from './Schedule'
import { CreateMedicalStaff } from './MedicalStaff'
import AppointmentMutations from './Appointment'
import PatientMutations from './Patient'
import { CreateUser } from './User'

export default [
  CreateSchedule,
  CreateMedicalStaff,
  ...AppointmentMutations,
  ...PatientMutations,
  CreateUser,
]
