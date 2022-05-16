/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './../context'
import type { ValidateResolver } from 'nexus-validate'
import type { core } from 'nexus'
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "DateTime";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateAppointmentInput: {
    // input type
    date: NexusGenScalars['DateTime'] // DateTime!
    status: NexusGenEnums['AppointmentStatus'] // AppointmentStatus!
    visitType: NexusGenEnums['VisitType'] // VisitType!
  }
  CreateHospitalBillInput: {
    // input type
    amount: number // Float!
    date: NexusGenScalars['DateTime'] // DateTime!
    patientId: number // Int!
    status: NexusGenEnums['BillStatus'] // BillStatus!
  }
  CreateMedicalRecordInput: {
    // input type
    date: NexusGenScalars['DateTime'] // DateTime!
    diagnosis: string // String!
    patientId: number // Int!
    prescription: string // String!
  }
  CreateMedicalStaffInput: {
    // input type
    address: string // String!
    contactNum: string // String!
    firstName: string // String!
    lastName: string // String!
  }
  CreatePatientInput: {
    // input type
    address: string // String!
    contactNum: string // String!
    dateOfBirth: NexusGenScalars['DateTime'] // DateTime!
    firstName: string // String!
    lastName: string // String!
    sex: NexusGenEnums['Sex'] // Sex!
  }
  CreateScheduleInput: {
    // input type
    endTime: NexusGenScalars['DateTime'] // DateTime!
    medStaffId: number // Int!
    startTime: NexusGenScalars['DateTime'] // DateTime!
  }
  CreateUserInput: {
    // input type
    password: string // String!
    username: string // String!
  }
  EditHospitalBillInput: {
    // input type
    amount?: number | null // Int
    date?: NexusGenScalars['DateTime'] | null // DateTime
    status?: NexusGenEnums['BillStatus'] | null // BillStatus
  }
  EditPatientInput: {
    // input type
    address?: string | null // String
    contactNum?: string | null // String
    dateOfBirth?: NexusGenScalars['DateTime'] | null // DateTime
    firstName?: string | null // String
    id?: number | null // Int
    lastName?: string | null // String
    sex?: NexusGenEnums['Sex'] | null // Sex
  }
}

export interface NexusGenEnums {
  AppointmentStatus: 'CANCELED' | 'DONE' | 'EXPIRED' | 'PENDING'
  BillStatus: 'PAID' | 'UNPAID'
  Sex: 'FEMALE' | 'MALE'
  UserType: 'ADMIN' | 'USER'
  VisitType: 'FOLLOWUP' | 'ROUTINE' | 'URGENT'
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Appointment: {
    // root type
    date: NexusGenScalars['DateTime'] // DateTime!
    id: number // Int!
    status?: NexusGenEnums['AppointmentStatus'] | null // AppointmentStatus
    visitType?: NexusGenEnums['VisitType'] | null // VisitType
  }
  HospitalBill: {
    // root type
    amount: number // Float!
    date: NexusGenScalars['DateTime'] // DateTime!
    id: number // Int!
    status?: NexusGenEnums['BillStatus'] | null // BillStatus
  }
  MedicalRecord: {
    // root type
    date: NexusGenScalars['DateTime'] // DateTime!
    diagnosis: string // String!
    id: number // Int!
    prescription: string // String!
  }
  MedicalStaff: {
    // root type
    address: string // String!
    contactNum: string // String!
    firstName: string // String!
    id: number // Int!
    lastName: string // String!
  }
  Mutation: {}
  Patient: {
    // root type
    address: string // String!
    contactNum: string // String!
    dateOfBirth: NexusGenScalars['DateTime'] // DateTime!
    firstName: string // String!
    id: number // Int!
    lastName: string // String!
    sex: NexusGenEnums['Sex'] // Sex!
  }
  Query: {}
  Schedule: {
    // root type
    endTime: NexusGenScalars['DateTime'] // DateTime!
    id: number // Int!
    startTime: NexusGenScalars['DateTime'] // DateTime!
  }
  User: {
    // root type
    id: number // Int!
    password: string // String!
    userType?: NexusGenEnums['UserType'] | null // UserType
    username: string // String!
  }
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums

export interface NexusGenFieldTypes {
  Appointment: {
    // field return type
    date: NexusGenScalars['DateTime'] // DateTime!
    hospitalBill: NexusGenRootTypes['HospitalBill'] | null // HospitalBill
    id: number // Int!
    medStaff: NexusGenRootTypes['MedicalStaff'] | null // MedicalStaff
    patient: NexusGenRootTypes['Patient'] | null // Patient
    status: NexusGenEnums['AppointmentStatus'] | null // AppointmentStatus
    visitType: NexusGenEnums['VisitType'] | null // VisitType
  }
  HospitalBill: {
    // field return type
    amount: number // Float!
    date: NexusGenScalars['DateTime'] // DateTime!
    id: number // Int!
    patient: NexusGenRootTypes['Patient'] | null // Patient
    status: NexusGenEnums['BillStatus'] | null // BillStatus
  }
  MedicalRecord: {
    // field return type
    date: NexusGenScalars['DateTime'] // DateTime!
    diagnosis: string // String!
    id: number // Int!
    patient: NexusGenRootTypes['Patient'] | null // Patient
    prescription: string // String!
  }
  MedicalStaff: {
    // field return type
    address: string // String!
    contactNum: string // String!
    firstName: string // String!
    fullName: string | null // String
    id: number // Int!
    lastName: string // String!
    schedules: Array<NexusGenRootTypes['Schedule'] | null> | null // [Schedule]
  }
  Mutation: {
    // field return type
    createAppointment: NexusGenRootTypes['Appointment'] | null // Appointment
    createAppointmentWithPatient: NexusGenRootTypes['Appointment'] | null // Appointment
    createHospitalBill: NexusGenRootTypes['HospitalBill'] | null // HospitalBill
    createMedicalRecord: NexusGenRootTypes['MedicalRecord'] | null // MedicalRecord
    createMedicalStaff: NexusGenRootTypes['MedicalStaff'] | null // MedicalStaff
    createPatient: NexusGenRootTypes['Patient'] | null // Patient
    createSchedule: NexusGenRootTypes['Schedule'] | null // Schedule
    createUser: NexusGenRootTypes['User'] | null // User
    deletePatient: NexusGenRootTypes['Patient'] | null // Patient
    editHospitalBill: NexusGenRootTypes['HospitalBill'] | null // HospitalBill
    editPatient: NexusGenRootTypes['Patient'] | null // Patient
  }
  Patient: {
    // field return type
    address: string // String!
    appointments: NexusGenRootTypes['Appointment'][] // [Appointment!]!
    contactNum: string // String!
    dateOfBirth: NexusGenScalars['DateTime'] // DateTime!
    firstName: string // String!
    fullName: string | null // String
    hospitalBills: NexusGenRootTypes['HospitalBill'][] // [HospitalBill!]!
    id: number // Int!
    lastName: string // String!
    medicalRecords: NexusGenRootTypes['MedicalRecord'][] // [MedicalRecord!]!
    sex: NexusGenEnums['Sex'] // Sex!
  }
  Query: {
    // field return type
    appointments: NexusGenRootTypes['Appointment'][] // [Appointment!]!
    hospitalBills: NexusGenRootTypes['HospitalBill'][] // [HospitalBill!]!
    medicalRecords: NexusGenRootTypes['MedicalRecord'][] // [MedicalRecord!]!
    medicalStaff: NexusGenRootTypes['MedicalStaff'][] // [MedicalStaff!]!
    patient: NexusGenRootTypes['Patient'] | null // Patient
    patients: NexusGenRootTypes['Patient'][] // [Patient!]!
    schedules: NexusGenRootTypes['Schedule'][] // [Schedule!]!
    users: NexusGenRootTypes['User'][] // [User!]!
  }
  Schedule: {
    // field return type
    endTime: NexusGenScalars['DateTime'] // DateTime!
    id: number // Int!
    medStaff: NexusGenRootTypes['MedicalStaff'] | null // MedicalStaff
    startTime: NexusGenScalars['DateTime'] // DateTime!
  }
  User: {
    // field return type
    id: number // Int!
    password: string // String!
    userType: NexusGenEnums['UserType'] | null // UserType
    username: string // String!
  }
}

export interface NexusGenFieldTypeNames {
  Appointment: {
    // field return type name
    date: 'DateTime'
    hospitalBill: 'HospitalBill'
    id: 'Int'
    medStaff: 'MedicalStaff'
    patient: 'Patient'
    status: 'AppointmentStatus'
    visitType: 'VisitType'
  }
  HospitalBill: {
    // field return type name
    amount: 'Float'
    date: 'DateTime'
    id: 'Int'
    patient: 'Patient'
    status: 'BillStatus'
  }
  MedicalRecord: {
    // field return type name
    date: 'DateTime'
    diagnosis: 'String'
    id: 'Int'
    patient: 'Patient'
    prescription: 'String'
  }
  MedicalStaff: {
    // field return type name
    address: 'String'
    contactNum: 'String'
    firstName: 'String'
    fullName: 'String'
    id: 'Int'
    lastName: 'String'
    schedules: 'Schedule'
  }
  Mutation: {
    // field return type name
    createAppointment: 'Appointment'
    createAppointmentWithPatient: 'Appointment'
    createHospitalBill: 'HospitalBill'
    createMedicalRecord: 'MedicalRecord'
    createMedicalStaff: 'MedicalStaff'
    createPatient: 'Patient'
    createSchedule: 'Schedule'
    createUser: 'User'
    deletePatient: 'Patient'
    editHospitalBill: 'HospitalBill'
    editPatient: 'Patient'
  }
  Patient: {
    // field return type name
    address: 'String'
    appointments: 'Appointment'
    contactNum: 'String'
    dateOfBirth: 'DateTime'
    firstName: 'String'
    fullName: 'String'
    hospitalBills: 'HospitalBill'
    id: 'Int'
    lastName: 'String'
    medicalRecords: 'MedicalRecord'
    sex: 'Sex'
  }
  Query: {
    // field return type name
    appointments: 'Appointment'
    hospitalBills: 'HospitalBill'
    medicalRecords: 'MedicalRecord'
    medicalStaff: 'MedicalStaff'
    patient: 'Patient'
    patients: 'Patient'
    schedules: 'Schedule'
    users: 'User'
  }
  Schedule: {
    // field return type name
    endTime: 'DateTime'
    id: 'Int'
    medStaff: 'MedicalStaff'
    startTime: 'DateTime'
  }
  User: {
    // field return type name
    id: 'Int'
    password: 'String'
    userType: 'UserType'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAppointment: {
      // args
      data: NexusGenInputs['CreateAppointmentInput'] // CreateAppointmentInput!
      medStaffId: number // Int!
      patientId: number // Int!
    }
    createAppointmentWithPatient: {
      // args
      appointment: NexusGenInputs['CreateAppointmentInput'] // CreateAppointmentInput!
      medStaffId: number // Int!
      patient: NexusGenInputs['CreatePatientInput'] // CreatePatientInput!
    }
    createHospitalBill: {
      // args
      data: NexusGenInputs['CreateHospitalBillInput'] // CreateHospitalBillInput!
    }
    createMedicalRecord: {
      // args
      data: NexusGenInputs['CreateMedicalRecordInput'] // CreateMedicalRecordInput!
    }
    createMedicalStaff: {
      // args
      data: NexusGenInputs['CreateMedicalStaffInput'] // CreateMedicalStaffInput!
    }
    createPatient: {
      // args
      data: NexusGenInputs['CreatePatientInput'] // CreatePatientInput!
    }
    createSchedule: {
      // args
      data: NexusGenInputs['CreateScheduleInput'] // CreateScheduleInput!
    }
    createUser: {
      // args
      data: NexusGenInputs['CreateUserInput'] // CreateUserInput!
    }
    deletePatient: {
      // args
      id: number // Int!
    }
    editHospitalBill: {
      // args
      data: NexusGenInputs['EditHospitalBillInput'] // EditHospitalBillInput!
      id: number // Int!
    }
    editPatient: {
      // args
      data: NexusGenInputs['EditPatientInput'] // EditPatientInput!
      id: number // Int!
    }
  }
  Query: {
    patient: {
      // args
      id: number // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = never

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
