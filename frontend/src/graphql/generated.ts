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
  hospitalBills: Array<HospitalBill>
  medicalRecords: Array<MedicalRecord>
  medicalStaff: Array<MedicalStaff>
  patient?: Maybe<Patient>
  patients: Array<Patient>
  schedules: Array<Schedule>
  users: Array<User>
}

export type QueryPatientArgs = {
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

export type MedicalStaffQueryQueryVariables = Exact<{ [key: string]: never }>

export type MedicalStaffQueryQuery = {
  __typename?: 'Query'
  medicalStaff: Array<{
    __typename?: 'MedicalStaff'
    id: number
    lastName: string
  }>
}

export type AppointmentQueryQueryVariables = Exact<{ [key: string]: never }>

export type AppointmentQueryQuery = {
  __typename?: 'Query'
  appointments: Array<{
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
  }>
}

export type CreateBillMutationVariables = Exact<{
  data: CreateHospitalBillInput
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

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>

export type Unnamed_1_Query = {
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

export type MedicalStaffsQueryQueryVariables = Exact<{ [key: string]: never }>

export type MedicalStaffsQueryQuery = {
  __typename?: 'Query'
  medicalStaff: Array<{
    __typename?: 'MedicalStaff'
    id: number
    fullName?: string | null
    schedules?: Array<{
      __typename?: 'Schedule'
      startTime: any
      endTime: any
      status?: ScheduleStatus | null
    } | null> | null
  }>
}

export type PatientQueryQueryVariables = Exact<{ [key: string]: never }>

export type PatientQueryQuery = {
  __typename?: 'Query'
  patients: Array<{
    __typename?: 'Patient'
    id: number
    fullName?: string | null
    sex: Sex
    contactNum: string
    latestAppointment?: {
      __typename?: 'Appointment'
      date: any
      visitType?: VisitType | null
      medStaff?: {
        __typename?: 'MedicalStaff'
        fullName?: string | null
      } | null
    } | null
  }>
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

export const AppointmentQueryDocument = gql`
  query appointmentQuery {
    appointments {
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
  }
`

export function useAppointmentQueryQuery(
  options?: Omit<Urql.UseQueryArgs<AppointmentQueryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppointmentQueryQuery>({
    query: AppointmentQueryDocument,
    ...options,
  })
}
export const CreateBillDocument = gql`
  mutation CreateBill($data: CreateHospitalBillInput!) {
    createHospitalBill(data: $data) {
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
export const Document = gql`
  {
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

export const PatientQueryDocument = gql`
  query patientQuery {
    patients {
      id
      fullName
      sex
      contactNum
      latestAppointment {
        date
        visitType
        medStaff {
          fullName
        }
      }
    }
  }
`

export function usePatientQueryQuery(
  options?: Omit<Urql.UseQueryArgs<PatientQueryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PatientQueryQuery>({
    query: PatientQueryDocument,
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
