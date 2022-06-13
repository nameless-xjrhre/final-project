import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type Appointment = {
  __typename?: 'Appointment'
  date: Scalars['DateTime']
  hospitalBill?: Maybe<HospitalBill>
  id: Scalars['Int']
  medStaff?: Maybe<MedicalStaff>
  note?: Maybe<Scalars['String']>
  patient?: Maybe<Patient>
  status?: Maybe<AppointmentStatus>
  visitType?: Maybe<VisitType>
}

export enum AppointmentStatus {
  Canceled = 'CANCELED',
  Done = 'DONE',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
}

export enum BillStatus {
  Paid = 'PAID',
  Unpaid = 'UNPAID',
}

export type CreateAppointmentInput = {
  date: Scalars['DateTime']
  note?: InputMaybe<Scalars['String']>
  status: AppointmentStatus
  visitType: VisitType
}

export type CreateHospitalBillInput = {
  amount: Scalars['Float']
  date: Scalars['DateTime']
  deadlineDate?: InputMaybe<Scalars['DateTime']>
  medStaffId?: InputMaybe<Scalars['Int']>
  patientId: Scalars['Int']
  status: BillStatus
}

export type CreateMedicalRecordInput = {
  date: Scalars['DateTime']
  diagnosis: Scalars['String']
  medStaffId?: InputMaybe<Scalars['Int']>
  patientId: Scalars['Int']
  prescription: Scalars['String']
}

export type CreateMedicalStaffInput = {
  address: Scalars['String']
  contactNum: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type CreatePatientInput = {
  address: Scalars['String']
  contactNum: Scalars['String']
  dateOfBirth: Scalars['DateTime']
  firstName: Scalars['String']
  lastName: Scalars['String']
  sex: Sex
}

export type CreateScheduleInput = {
  endTime: Scalars['DateTime']
  medStaffId: Scalars['Int']
  startTime: Scalars['DateTime']
  status: ScheduleStatus
}

export type CreateUserInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type EditAppointmentInput = {
  date?: InputMaybe<Scalars['DateTime']>
  note?: InputMaybe<Scalars['String']>
  status?: InputMaybe<AppointmentStatus>
  visitType?: InputMaybe<VisitType>
}

export type EditHospitalBillInput = {
  amount?: InputMaybe<Scalars['Int']>
  date?: InputMaybe<Scalars['DateTime']>
  deadlineDate?: InputMaybe<Scalars['DateTime']>
  status?: InputMaybe<BillStatus>
}

export type EditPatientInput = {
  address?: InputMaybe<Scalars['String']>
  contactNum?: InputMaybe<Scalars['String']>
  dateOfBirth?: InputMaybe<Scalars['DateTime']>
  firstName?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  lastName?: InputMaybe<Scalars['String']>
  sex?: InputMaybe<Sex>
}

export type EditScheduleInput = {
  endTime?: InputMaybe<Scalars['DateTime']>
  medStaffId?: InputMaybe<Scalars['Int']>
  startTime?: InputMaybe<Scalars['DateTime']>
  status?: InputMaybe<ScheduleStatus>
}

export type HospitalBill = {
  __typename?: 'HospitalBill'
  amount: Scalars['Float']
  appointment?: Maybe<Appointment>
  date: Scalars['DateTime']
  deadlineDate?: Maybe<Scalars['DateTime']>
  id: Scalars['Int']
  medStaff?: Maybe<MedicalStaff>
  patient?: Maybe<Patient>
  patientId: Scalars['Int']
  status: BillStatus
}

export type MedicalRecord = {
  __typename?: 'MedicalRecord'
  date: Scalars['DateTime']
  diagnosis: Scalars['String']
  id: Scalars['Int']
  medStaff?: Maybe<MedicalStaff>
  patient?: Maybe<Patient>
  prescription: Scalars['String']
}

export type MedicalStaff = {
  __typename?: 'MedicalStaff'
  address: Scalars['String']
  contactNum: Scalars['String']
  firstName: Scalars['String']
  fullName?: Maybe<Scalars['String']>
  hospitalBills?: Maybe<Array<Maybe<HospitalBill>>>
  id: Scalars['Int']
  lastName: Scalars['String']
  medicalRecords?: Maybe<Array<Maybe<MedicalRecord>>>
  schedules?: Maybe<Array<Maybe<Schedule>>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createAppointment?: Maybe<Appointment>
  createAppointmentWithPatient?: Maybe<Appointment>
  createHospitalBill?: Maybe<HospitalBill>
  createMedicalRecord?: Maybe<MedicalRecord>
  createMedicalStaff?: Maybe<MedicalStaff>
  createPatient?: Maybe<Patient>
  createSchedule?: Maybe<Schedule>
  createSchedules?: Maybe<Array<Maybe<Schedule>>>
  createUser?: Maybe<User>
  deleteAppointment?: Maybe<Appointment>
  deletePatient?: Maybe<Patient>
  deleteSchedule?: Maybe<Schedule>
  editAppointment?: Maybe<Appointment>
  editHospitalBill?: Maybe<HospitalBill>
  editPatient?: Maybe<Patient>
  editSchedule?: Maybe<Schedule>
}

export type MutationCreateAppointmentArgs = {
  data: CreateAppointmentInput
  medStaffId: Scalars['Int']
  patientId: Scalars['Int']
}

export type MutationCreateAppointmentWithPatientArgs = {
  appointment: CreateAppointmentInput
  medStaffId: Scalars['Int']
  patient: CreatePatientInput
}

export type MutationCreateHospitalBillArgs = {
  appointmentId: Scalars['Int']
  data: CreateHospitalBillInput
}

export type MutationCreateMedicalRecordArgs = {
  data: CreateMedicalRecordInput
}

export type MutationCreateMedicalStaffArgs = {
  data: CreateMedicalStaffInput
}

export type MutationCreatePatientArgs = {
  data: CreatePatientInput
}

export type MutationCreateScheduleArgs = {
  data: CreateScheduleInput
}

export type MutationCreateSchedulesArgs = {
  data: Array<CreateScheduleInput>
}

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationDeleteAppointmentArgs = {
  id: Scalars['Int']
}

export type MutationDeletePatientArgs = {
  id: Scalars['Int']
}

export type MutationDeleteScheduleArgs = {
  id: Scalars['Int']
}

export type MutationEditAppointmentArgs = {
  data: EditAppointmentInput
  id: Scalars['Int']
}

export type MutationEditHospitalBillArgs = {
  data: EditHospitalBillInput
  id: Scalars['Int']
}

export type MutationEditPatientArgs = {
  data: EditPatientInput
  id: Scalars['Int']
}

export type MutationEditScheduleArgs = {
  data: EditScheduleInput
  id: Scalars['Int']
}

export type Patient = {
  __typename?: 'Patient'
  address: Scalars['String']
  appointments: Array<Appointment>
  contactNum: Scalars['String']
  dateOfBirth: Scalars['DateTime']
  firstName: Scalars['String']
  fullName?: Maybe<Scalars['String']>
  hospitalBills: Array<HospitalBill>
  id: Scalars['Int']
  lastName: Scalars['String']
  latestAppointment?: Maybe<Appointment>
  medicalRecords: Array<MedicalRecord>
  sex: Sex
}

export type Query = {
  __typename?: 'Query'
  appointments: Array<Appointment>
  appointmentsRange?: Maybe<Array<Maybe<Appointment>>>
  availableStaffs?: Maybe<Array<Maybe<MedicalStaff>>>
  hospitalBills: Array<HospitalBill>
  hospitalBillsByPatient?: Maybe<Array<Maybe<HospitalBill>>>
  medicalRecords: Array<MedicalRecord>
  medicalRecordsByPatient?: Maybe<Array<Maybe<MedicalRecord>>>
  medicalStaff: Array<MedicalStaff>
  pastAppointments?: Maybe<Array<Maybe<Appointment>>>
  patient?: Maybe<Patient>
  patients: Array<Patient>
  schedules: Array<Schedule>
  totalAppointments?: Maybe<Scalars['Int']>
  totalBill?: Maybe<Scalars['Float']>
  totalBillPaid?: Maybe<Scalars['Float']>
  totalBillUnpaid?: Maybe<Scalars['Float']>
  totalDoneAppointments?: Maybe<Scalars['Int']>
  totalPatients?: Maybe<Scalars['Int']>
  upcomingAppointments?: Maybe<Array<Maybe<Appointment>>>
  users: Array<User>
}

export type QueryAppointmentsRangeArgs = {
  count: Scalars['Int']
  start: Scalars['Int']
}

export type QueryHospitalBillsByPatientArgs = {
  id: Scalars['Int']
}

export type QueryMedicalRecordsByPatientArgs = {
  id: Scalars['Int']
}

export type QueryPastAppointmentsArgs = {
  id: Scalars['Int']
}

export type QueryPatientArgs = {
  id: Scalars['Int']
}

export type QueryUpcomingAppointmentsArgs = {
  id: Scalars['Int']
}

export type Schedule = {
  __typename?: 'Schedule'
  endTime: Scalars['DateTime']
  id: Scalars['Int']
  medStaff?: Maybe<MedicalStaff>
  startTime: Scalars['DateTime']
  status?: Maybe<ScheduleStatus>
}

export enum ScheduleStatus {
  Closed = 'CLOSED',
  Done = 'DONE',
  NotAvailable = 'NOT_AVAILABLE',
  Open = 'OPEN',
}

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type User = {
  __typename?: 'User'
  id: Scalars['Int']
  password: Scalars['String']
  userType?: Maybe<UserType>
  username: Scalars['String']
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum VisitType {
  Followup = 'FOLLOWUP',
  Routine = 'ROUTINE',
  Urgent = 'URGENT',
}

export type CreateAppointmentMutationVariables = Exact<{
  data: CreateAppointmentInput
  medStaffId: Scalars['Int']
  patientId: Scalars['Int']
}>

export type CreateAppointmentMutation = {
  __typename?: 'Mutation'
  createAppointment?: {
    __typename?: 'Appointment'
    id: number
    date: any
    visitType?: VisitType | null
    note?: string | null
    patient?: { __typename?: 'Patient'; id: number } | null
    medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
  } | null
}

export type CreateAppointmentWithPatientMutationVariables = Exact<{
  appointment: CreateAppointmentInput
  patient: CreatePatientInput
  medStaffId: Scalars['Int']
}>

export type CreateAppointmentWithPatientMutation = {
  __typename?: 'Mutation'
  createAppointmentWithPatient?: {
    __typename?: 'Appointment'
    id: number
    date: any
    visitType?: VisitType | null
    status?: AppointmentStatus | null
    patient?: {
      __typename?: 'Patient'
      firstName: string
      lastName: string
      sex: Sex
      dateOfBirth: any
      contactNum: string
      address: string
    } | null
    medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
  } | null
}

export type UpdateAppointmentMutationVariables = Exact<{
  id: Scalars['Int']
  data: EditAppointmentInput
}>

export type UpdateAppointmentMutation = {
  __typename?: 'Mutation'
  editAppointment?: {
    __typename?: 'Appointment'
    id: number
    date: any
    note?: string | null
    visitType?: VisitType | null
    status?: AppointmentStatus | null
    patient?: { __typename?: 'Patient'; id: number } | null
    medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
  } | null
}

export type DeleteAppointmentMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteAppointmentMutation = {
  __typename?: 'Mutation'
  deleteAppointment?: { __typename?: 'Appointment'; id: number } | null
}

export type AvailableStaffsQueryVariables = Exact<{ [key: string]: never }>

export type AvailableStaffsQuery = {
  __typename?: 'Query'
  availableStaffs?: Array<{
    __typename?: 'MedicalStaff'
    id: number
    firstName: string
    lastName: string
    address: string
    contactNum: string
    schedules?: Array<{
      __typename?: 'Schedule'
      id: number
      startTime: any
      endTime: any
      status?: ScheduleStatus | null
      medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
    } | null> | null
  } | null> | null
}

export type PatientFullNameQueryVariables = Exact<{ [key: string]: never }>

export type PatientFullNameQuery = {
  __typename?: 'Query'
  patients: Array<{
    __typename?: 'Patient'
    id: number
    fullName?: string | null
  }>
}

export type AppointmentsListQueryVariables = Exact<{
  start: Scalars['Int']
  count: Scalars['Int']
}>

export type AppointmentsListQuery = {
  __typename?: 'Query'
  totalAppointments?: number | null
  appointmentsRange?: Array<{
    __typename?: 'Appointment'
    id: number
    visitType?: VisitType | null
    date: any
    status?: AppointmentStatus | null
    note?: string | null
    patient?: {
      __typename?: 'Patient'
      id: number
      fullName?: string | null
    } | null
    medStaff?: {
      __typename?: 'MedicalStaff'
      id: number
      fullName?: string | null
      schedules?: Array<{
        __typename?: 'Schedule'
        id: number
        endTime: any
        startTime: any
        status?: ScheduleStatus | null
      } | null> | null
    } | null
  } | null> | null
}

export type UpdateAppointmentStatusMutationVariables = Exact<{
  id: Scalars['Int']
  data: EditAppointmentInput
}>

export type UpdateAppointmentStatusMutation = {
  __typename?: 'Mutation'
  editAppointment?: {
    __typename?: 'Appointment'
    id: number
    date: any
    status?: AppointmentStatus | null
    patient?: { __typename?: 'Patient'; fullName?: string | null } | null
  } | null
}

export type CreateBillMutationVariables = Exact<{
  data: CreateHospitalBillInput
  appointmentId: Scalars['Int']
}>

export type CreateBillMutation = {
  __typename?: 'Mutation'
  createHospitalBill?: {
    __typename?: 'HospitalBill'
    id: number
    date: any
    amount: number
    status: BillStatus
    deadlineDate?: any | null
    patient?: { __typename?: 'Patient'; id: number } | null
    medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
  } | null
}

export type EditHospitallBillMutationVariables = Exact<{
  id: Scalars['Int']
  data: EditHospitalBillInput
}>

export type EditHospitallBillMutation = {
  __typename?: 'Mutation'
  editHospitalBill?: {
    __typename?: 'HospitalBill'
    id: number
    amount: number
    deadlineDate?: any | null
  } | null
}

export type HospitalBillsQueryVariables = Exact<{ [key: string]: never }>

export type HospitalBillsQuery = {
  __typename?: 'Query'
  hospitalBills: Array<{
    __typename?: 'HospitalBill'
    id: number
    date: any
    amount: number
    status: BillStatus
    deadlineDate?: any | null
    patient?: {
      __typename?: 'Patient'
      id: number
      fullName?: string | null
    } | null
    medStaff?: {
      __typename?: 'MedicalStaff'
      id: number
      fullName?: string | null
    } | null
  }>
}

export type MarkAsPaidBillMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type MarkAsPaidBillMutation = {
  __typename?: 'Mutation'
  editHospitalBill?: {
    __typename?: 'HospitalBill'
    id: number
    status: BillStatus
  } | null
}

export type AppointmentsQueryVariables = Exact<{
  start: Scalars['Int']
  count: Scalars['Int']
}>

export type AppointmentsQuery = {
  __typename?: 'Query'
  totalAppointments?: number | null
  appointmentsRange?: Array<{
    __typename?: 'Appointment'
    id: number
    visitType?: VisitType | null
    date: any
    status?: AppointmentStatus | null
    patient?: {
      __typename?: 'Patient'
      id: number
      fullName?: string | null
    } | null
    medStaff?: {
      __typename?: 'MedicalStaff'
      id: number
      fullName?: string | null
    } | null
  } | null> | null
}

export type CreateMedicalStaffMutationVariables = Exact<{
  data: CreateMedicalStaffInput
}>

export type CreateMedicalStaffMutation = {
  __typename?: 'Mutation'
  createMedicalStaff?: {
    __typename?: 'MedicalStaff'
    id: number
    firstName: string
    lastName: string
    contactNum: string
    address: string
  } | null
}

export type DeleteScheduleMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteScheduleMutation = {
  __typename?: 'Mutation'
  deleteSchedule?: { __typename?: 'Schedule'; id: number } | null
}

export type MedicalStaffsQueryQueryVariables = Exact<{ [key: string]: never }>

export type MedicalStaffsQueryQuery = {
  __typename?: 'Query'
  medicalStaff: Array<{
    __typename?: 'MedicalStaff'
    id: number
    fullName?: string | null
    schedules?: Array<{
      __typename?: 'Schedule'
      id: number
      startTime: any
      endTime: any
      status?: ScheduleStatus | null
    } | null> | null
  }>
}

export type UpdateScheduleStatusMutationVariables = Exact<{
  id: Scalars['Int']
  data: EditScheduleInput
}>

export type UpdateScheduleStatusMutation = {
  __typename?: 'Mutation'
  editSchedule?: {
    __typename?: 'Schedule'
    id: number
    status?: ScheduleStatus | null
  } | null
}

export type CreateMedicalRecordMutationVariables = Exact<{
  data: CreateMedicalRecordInput
}>

export type CreateMedicalRecordMutation = {
  __typename?: 'Mutation'
  createMedicalRecord?: {
    __typename?: 'MedicalRecord'
    id: number
    date: any
    diagnosis: string
    prescription: string
    patient?: { __typename?: 'Patient'; id: number } | null
    medStaff?: { __typename?: 'MedicalStaff'; id: number } | null
  } | null
}

export type MedicalStaffQueryQueryVariables = Exact<{ [key: string]: never }>

export type MedicalStaffQueryQuery = {
  __typename?: 'Query'
  medicalStaff: Array<{
    __typename?: 'MedicalStaff'
    id: number
    lastName: string
  }>
}

export type DeletePatientMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeletePatientMutation = {
  __typename?: 'Mutation'
  deletePatient?: { __typename?: 'Patient'; id: number } | null
}

export type UpdatePatientMutationVariables = Exact<{
  id: Scalars['Int']
  data: EditPatientInput
}>

export type UpdatePatientMutation = {
  __typename?: 'Mutation'
  editPatient?: {
    __typename?: 'Patient'
    id: number
    firstName: string
    lastName: string
    sex: Sex
    dateOfBirth: any
    contactNum: string
    address: string
  } | null
}

export type PatientFullDetailsQueryVariables = Exact<{ [key: string]: never }>

export type PatientFullDetailsQuery = {
  __typename?: 'Query'
  patients: Array<{
    __typename?: 'Patient'
    id: number
    fullName?: string | null
    sex: Sex
    firstName: string
    lastName: string
    contactNum: string
    dateOfBirth: any
    address: string
    latestAppointment?: {
      __typename?: 'Appointment'
      date: any
      visitType?: VisitType | null
      medStaff?: {
        __typename?: 'MedicalStaff'
        id: number
        fullName?: string | null
      } | null
    } | null
  }>
}

export type AppointmentHistoryQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type AppointmentHistoryQuery = {
  __typename?: 'Query'
  upcomingAppointments?: Array<{
    __typename?: 'Appointment'
    id: number
    date: any
    visitType?: VisitType | null
    medStaff?: { __typename?: 'MedicalStaff'; fullName?: string | null } | null
  } | null> | null
  pastAppointments?: Array<{
    __typename?: 'Appointment'
    id: number
    date: any
    visitType?: VisitType | null
    medStaff?: { __typename?: 'MedicalStaff'; fullName?: string | null } | null
  } | null> | null
}

export type CreateSchedulesMutationVariables = Exact<{
  data: Array<CreateScheduleInput> | CreateScheduleInput
}>

export type CreateSchedulesMutation = {
  __typename?: 'Mutation'
  createSchedules?: Array<{
    __typename?: 'Schedule'
    id: number
    status?: ScheduleStatus | null
    startTime: any
    endTime: any
  } | null> | null
}

export type PatientRecordsQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type PatientRecordsQuery = {
  __typename?: 'Query'
  patient?: {
    __typename?: 'Patient'
    id: number
    medicalRecords: Array<{
      __typename?: 'MedicalRecord'
      date: any
      diagnosis: string
      prescription: string
      medStaff?: {
        __typename?: 'MedicalStaff'
        id: number
        fullName?: string | null
      } | null
    }>
    hospitalBills: Array<{
      __typename?: 'HospitalBill'
      date: any
      deadlineDate?: any | null
      amount: number
      status: BillStatus
      medStaff?: {
        __typename?: 'MedicalStaff'
        fullName?: string | null
      } | null
      appointment?: {
        __typename?: 'Appointment'
        visitType?: VisitType | null
      } | null
    }>
  } | null
}

export type DashboardDetailsQueryVariables = Exact<{ [key: string]: never }>

export type DashboardDetailsQuery = {
  __typename?: 'Query'
  totalAppointments?: number | null
  totalPatients?: number | null
  totalDoneAppointments?: number | null
  totalBillPaid?: number | null
}

export type PatientDetailsQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type PatientDetailsQuery = {
  __typename?: 'Query'
  patient?: {
    __typename?: 'Patient'
    id: number
    fullName?: string | null
    sex: Sex
    address: string
    dateOfBirth: any
    contactNum: string
  } | null
}

export const CreateAppointmentDocument = gql`
  mutation CreateAppointment(
    $data: CreateAppointmentInput!
    $medStaffId: Int!
    $patientId: Int!
  ) {
    createAppointment(
      data: $data
      medStaffId: $medStaffId
      patientId: $patientId
    ) {
      id
      date
      visitType
      note
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export function useCreateAppointmentMutation() {
  return Urql.useMutation<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables
  >(CreateAppointmentDocument)
}
export const CreateAppointmentWithPatientDocument = gql`
  mutation CreateAppointmentWithPatient(
    $appointment: CreateAppointmentInput!
    $patient: CreatePatientInput!
    $medStaffId: Int!
  ) {
    createAppointmentWithPatient(
      appointment: $appointment
      patient: $patient
      medStaffId: $medStaffId
    ) {
      id
      date
      visitType
      status
      patient {
        firstName
        lastName
        sex
        dateOfBirth
        contactNum
        address
      }
      medStaff {
        id
      }
    }
  }
`

export function useCreateAppointmentWithPatientMutation() {
  return Urql.useMutation<
    CreateAppointmentWithPatientMutation,
    CreateAppointmentWithPatientMutationVariables
  >(CreateAppointmentWithPatientDocument)
}
export const UpdateAppointmentDocument = gql`
  mutation UpdateAppointment($id: Int!, $data: EditAppointmentInput!) {
    editAppointment(id: $id, data: $data) {
      id
      date
      note
      visitType
      status
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export function useUpdateAppointmentMutation() {
  return Urql.useMutation<
    UpdateAppointmentMutation,
    UpdateAppointmentMutationVariables
  >(UpdateAppointmentDocument)
}
export const DeleteAppointmentDocument = gql`
  mutation DeleteAppointment($id: Int!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`

export function useDeleteAppointmentMutation() {
  return Urql.useMutation<
    DeleteAppointmentMutation,
    DeleteAppointmentMutationVariables
  >(DeleteAppointmentDocument)
}
export const AvailableStaffsDocument = gql`
  query AvailableStaffs {
    availableStaffs {
      id
      firstName
      lastName
      address
      contactNum
      schedules {
        id
        startTime
        endTime
        status
        medStaff {
          id
        }
      }
    }
  }
`

export function useAvailableStaffsQuery(
  options?: Omit<Urql.UseQueryArgs<AvailableStaffsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AvailableStaffsQuery>({
    query: AvailableStaffsDocument,
    ...options,
  })
}
export const PatientFullNameDocument = gql`
  query PatientFullName {
    patients {
      id
      fullName
    }
  }
`

export function usePatientFullNameQuery(
  options?: Omit<Urql.UseQueryArgs<PatientFullNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PatientFullNameQuery>({
    query: PatientFullNameDocument,
    ...options,
  })
}
export const AppointmentsListDocument = gql`
  query AppointmentsList($start: Int!, $count: Int!) {
    appointmentsRange(start: $start, count: $count) {
      id
      visitType
      date
      status
      note
      patient {
        id
        fullName
      }
      medStaff {
        id
        fullName
        schedules {
          id
          endTime
          startTime
          status
        }
      }
    }
    totalAppointments
  }
`

export function useAppointmentsListQuery(
  options: Omit<Urql.UseQueryArgs<AppointmentsListQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppointmentsListQuery>({
    query: AppointmentsListDocument,
    ...options,
  })
}
export const UpdateAppointmentStatusDocument = gql`
  mutation UpdateAppointmentStatus($id: Int!, $data: EditAppointmentInput!) {
    editAppointment(id: $id, data: $data) {
      id
      date
      status
      patient {
        fullName
      }
    }
  }
`

export function useUpdateAppointmentStatusMutation() {
  return Urql.useMutation<
    UpdateAppointmentStatusMutation,
    UpdateAppointmentStatusMutationVariables
  >(UpdateAppointmentStatusDocument)
}
export const CreateBillDocument = gql`
  mutation CreateBill($data: CreateHospitalBillInput!, $appointmentId: Int!) {
    createHospitalBill(data: $data, appointmentId: $appointmentId) {
      id
      date
      amount
      status
      deadlineDate
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export function useCreateBillMutation() {
  return Urql.useMutation<CreateBillMutation, CreateBillMutationVariables>(
    CreateBillDocument,
  )
}
export const EditHospitallBillDocument = gql`
  mutation EditHospitallBill($id: Int!, $data: EditHospitalBillInput!) {
    editHospitalBill(id: $id, data: $data) {
      id
      amount
      deadlineDate
    }
  }
`

export function useEditHospitallBillMutation() {
  return Urql.useMutation<
    EditHospitallBillMutation,
    EditHospitallBillMutationVariables
  >(EditHospitallBillDocument)
}
export const HospitalBillsDocument = gql`
  query HospitalBills {
    hospitalBills {
      id
      date
      amount
      status
      deadlineDate
      patient {
        id
        fullName
      }
      medStaff {
        id
        fullName
      }
    }
  }
`

export function useHospitalBillsQuery(
  options?: Omit<Urql.UseQueryArgs<HospitalBillsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<HospitalBillsQuery>({
    query: HospitalBillsDocument,
    ...options,
  })
}
export const MarkAsPaidBillDocument = gql`
  mutation MarkAsPaidBill($id: Int!) {
    editHospitalBill(id: $id, data: { status: PAID }) {
      id
      status
    }
  }
`

export function useMarkAsPaidBillMutation() {
  return Urql.useMutation<
    MarkAsPaidBillMutation,
    MarkAsPaidBillMutationVariables
  >(MarkAsPaidBillDocument)
}
export const AppointmentsDocument = gql`
  query Appointments($start: Int!, $count: Int!) {
    appointmentsRange(start: $start, count: $count) {
      id
      visitType
      date
      status
      patient {
        id
        fullName
      }
      medStaff {
        id
        fullName
      }
    }
    totalAppointments
  }
`

export function useAppointmentsQuery(
  options: Omit<Urql.UseQueryArgs<AppointmentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppointmentsQuery>({
    query: AppointmentsDocument,
    ...options,
  })
}
export const CreateMedicalStaffDocument = gql`
  mutation CreateMedicalStaff($data: CreateMedicalStaffInput!) {
    createMedicalStaff(data: $data) {
      id
      firstName
      lastName
      contactNum
      address
    }
  }
`

export function useCreateMedicalStaffMutation() {
  return Urql.useMutation<
    CreateMedicalStaffMutation,
    CreateMedicalStaffMutationVariables
  >(CreateMedicalStaffDocument)
}
export const DeleteScheduleDocument = gql`
  mutation DeleteSchedule($id: Int!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`

export function useDeleteScheduleMutation() {
  return Urql.useMutation<
    DeleteScheduleMutation,
    DeleteScheduleMutationVariables
  >(DeleteScheduleDocument)
}
export const MedicalStaffsQueryDocument = gql`
  query medicalStaffsQuery {
    medicalStaff {
      id
      fullName
      schedules {
        id
        startTime
        endTime
        status
      }
    }
  }
`

export function useMedicalStaffsQueryQuery(
  options?: Omit<Urql.UseQueryArgs<MedicalStaffsQueryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MedicalStaffsQueryQuery>({
    query: MedicalStaffsQueryDocument,
    ...options,
  })
}
export const UpdateScheduleStatusDocument = gql`
  mutation UpdateScheduleStatus($id: Int!, $data: EditScheduleInput!) {
    editSchedule(id: $id, data: $data) {
      id
      status
    }
  }
`

export function useUpdateScheduleStatusMutation() {
  return Urql.useMutation<
    UpdateScheduleStatusMutation,
    UpdateScheduleStatusMutationVariables
  >(UpdateScheduleStatusDocument)
}
export const CreateMedicalRecordDocument = gql`
  mutation CreateMedicalRecord($data: CreateMedicalRecordInput!) {
    createMedicalRecord(data: $data) {
      id
      date
      diagnosis
      prescription
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export function useCreateMedicalRecordMutation() {
  return Urql.useMutation<
    CreateMedicalRecordMutation,
    CreateMedicalRecordMutationVariables
  >(CreateMedicalRecordDocument)
}
export const MedicalStaffQueryDocument = gql`
  query MedicalStaffQuery {
    medicalStaff {
      id
      lastName
    }
  }
`

export function useMedicalStaffQueryQuery(
  options?: Omit<Urql.UseQueryArgs<MedicalStaffQueryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MedicalStaffQueryQuery>({
    query: MedicalStaffQueryDocument,
    ...options,
  })
}
export const DeletePatientDocument = gql`
  mutation DeletePatient($id: Int!) {
    deletePatient(id: $id) {
      id
    }
  }
`

export function useDeletePatientMutation() {
  return Urql.useMutation<
    DeletePatientMutation,
    DeletePatientMutationVariables
  >(DeletePatientDocument)
}
export const UpdatePatientDocument = gql`
  mutation UpdatePatient($id: Int!, $data: EditPatientInput!) {
    editPatient(id: $id, data: $data) {
      id
      firstName
      lastName
      sex
      dateOfBirth
      contactNum
      address
    }
  }
`

export function useUpdatePatientMutation() {
  return Urql.useMutation<
    UpdatePatientMutation,
    UpdatePatientMutationVariables
  >(UpdatePatientDocument)
}
export const PatientFullDetailsDocument = gql`
  query PatientFullDetails {
    patients {
      id
      fullName
      sex
      firstName
      lastName
      contactNum
      dateOfBirth
      address
      latestAppointment {
        date
        visitType
        medStaff {
          id
          fullName
        }
      }
    }
  }
`

export function usePatientFullDetailsQuery(
  options?: Omit<Urql.UseQueryArgs<PatientFullDetailsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PatientFullDetailsQuery>({
    query: PatientFullDetailsDocument,
    ...options,
  })
}
export const AppointmentHistoryDocument = gql`
  query AppointmentHistory($id: Int!) {
    upcomingAppointments(id: $id) {
      id
      date
      visitType
      medStaff {
        fullName
      }
    }
    pastAppointments(id: $id) {
      id
      date
      visitType
      medStaff {
        fullName
      }
    }
  }
`

export function useAppointmentHistoryQuery(
  options: Omit<Urql.UseQueryArgs<AppointmentHistoryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppointmentHistoryQuery>({
    query: AppointmentHistoryDocument,
    ...options,
  })
}
export const CreateSchedulesDocument = gql`
  mutation CreateSchedules($data: [CreateScheduleInput!]!) {
    createSchedules(data: $data) {
      id
      status
      startTime
      endTime
    }
  }
`

export function useCreateSchedulesMutation() {
  return Urql.useMutation<
    CreateSchedulesMutation,
    CreateSchedulesMutationVariables
  >(CreateSchedulesDocument)
}
export const PatientRecordsDocument = gql`
  query PatientRecords($id: Int!) {
    patient(id: $id) {
      id
      medicalRecords {
        date
        medStaff {
          id
          fullName
        }
        diagnosis
        prescription
      }
      hospitalBills {
        date
        medStaff {
          fullName
        }
        appointment {
          visitType
        }
        deadlineDate
        amount
        status
      }
    }
  }
`

export function usePatientRecordsQuery(
  options: Omit<Urql.UseQueryArgs<PatientRecordsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PatientRecordsQuery>({
    query: PatientRecordsDocument,
    ...options,
  })
}
export const DashboardDetailsDocument = gql`
  query DashboardDetails {
    totalAppointments
    totalPatients
    totalDoneAppointments
    totalBillPaid
  }
`

export function useDashboardDetailsQuery(
  options?: Omit<Urql.UseQueryArgs<DashboardDetailsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<DashboardDetailsQuery>({
    query: DashboardDetailsDocument,
    ...options,
  })
}
export const PatientDetailsDocument = gql`
  query PatientDetails($id: Int!) {
    patient(id: $id) {
      id
      fullName
      sex
      address
      dateOfBirth
      contactNum
    }
  }
`

export function usePatientDetailsQuery(
  options: Omit<Urql.UseQueryArgs<PatientDetailsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PatientDetailsQuery>({
    query: PatientDetailsDocument,
    ...options,
  })
}
