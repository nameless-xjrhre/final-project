import ScheduleMutations from './Schedule'
import { CreateMedicalStaff } from './MedicalStaff'
import AppointmentMutations from './Appointment'
import PatientMutations from './Patient'
import HospitalBillMutations from './HospitalBill'
import MedicalRecordMutations from './MedicalRecord'
import { CreateUser } from './User'

export default [
  ...ScheduleMutations,
  CreateMedicalStaff,
  ...AppointmentMutations,
  ...PatientMutations,
  ...HospitalBillMutations,
  ...MedicalRecordMutations,
  CreateUser,
]
