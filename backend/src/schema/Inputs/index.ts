import PatientInput from './Patient.input'
import HospitalBillInput from './HospitalBill.input'
import MedicalRecordInput from './MedicalRecord.input'
import AppointmentInput from './Appointment.input'
import ScheduleInput from './Schedule.input'
import MedicalStaffInput from './MedicalStaff.input'
import UserInput from './User.input'

export default [
  ...PatientInput,
  ...AppointmentInput,
  ...ScheduleInput,
  ...MedicalStaffInput,
  ...UserInput,
  ...HospitalBillInput,
  ...MedicalRecordInput,
]
