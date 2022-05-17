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
  status: AppointmentStatus
  visitType: VisitType
}

export type CreateHospitalBillInput = {
  amount: Scalars['Float']
  date: Scalars['DateTime']
  patientId: Scalars['Int']
  status: BillStatus
}

export type CreateMedicalRecordInput = {
  date: Scalars['DateTime']
  diagnosis: Scalars['String']
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
}

export type CreateUserInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type EditAppointmentInput = {
  date?: InputMaybe<Scalars['DateTime']>
  status?: InputMaybe<AppointmentStatus>
  visitType?: InputMaybe<VisitType>
}

export type EditHospitalBillInput = {
  amount?: InputMaybe<Scalars['Int']>
  date?: InputMaybe<Scalars['DateTime']>
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

export type HospitalBill = {
  __typename?: 'HospitalBill'
  amount: Scalars['Float']
  date: Scalars['DateTime']
  id: Scalars['Int']
  patient?: Maybe<Patient>
  status?: Maybe<BillStatus>
}

export type MedicalRecord = {
  __typename?: 'MedicalRecord'
  date: Scalars['DateTime']
  diagnosis: Scalars['String']
  id: Scalars['Int']
  patient?: Maybe<Patient>
  prescription: Scalars['String']
}

export type MedicalStaff = {
  __typename?: 'MedicalStaff'
  address: Scalars['String']
  contactNum: Scalars['String']
  firstName: Scalars['String']
  fullName?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lastName: Scalars['String']
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
  createUser?: Maybe<User>
  deletePatient?: Maybe<Patient>
  editAppointment?: Maybe<Appointment>
  editHospitalBill?: Maybe<HospitalBill>
  editPatient?: Maybe<Patient>
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

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationDeletePatientArgs = {
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
    patient?: { __typename?: 'Patient'; fullName?: string | null } | null
    medStaff?: { __typename?: 'MedicalStaff'; fullName?: string | null } | null
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
        fullName
      }
      medStaff {
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
