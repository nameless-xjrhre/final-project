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

export type Mutation = {
  __typename?: 'Mutation'
  createPatient: Patient
  createUser: User
}

export type MutationCreatePatientArgs = {
  address?: InputMaybe<Scalars['String']>
  contactNum?: InputMaybe<Scalars['String']>
  dateOfBirth: Scalars['DateTime']
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  sex: Sex
}

export type MutationCreateUserArgs = {
  password?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type Patient = {
  __typename?: 'Patient'
  address: Scalars['String']
  contactNum: Scalars['String']
  dateOfBirth: Scalars['DateTime']
  firstName: Scalars['String']
  fullName?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lastName: Scalars['String']
  sex?: Maybe<Sex>
}

export type Query = {
  __typename?: 'Query'
  patients: Array<Patient>
  users: Array<User>
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

export type PatientQueryQueryVariables = Exact<{ [key: string]: never }>

export type PatientQueryQuery = {
  __typename?: 'Query'
  patients: Array<{
    __typename?: 'Patient'
    id: number
    fullName?: string | null
    sex?: Sex | null
    contactNum: string
    dateOfBirth: any
  }>
}

export const PatientQueryDocument = gql`
  query patientQuery {
    patients {
      id
      fullName
      sex
      contactNum
      dateOfBirth
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
