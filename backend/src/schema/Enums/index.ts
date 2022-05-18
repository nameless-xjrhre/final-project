import { enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

export const SexType = enumType(gqlTypes.Sex)
export const VisitType = enumType(gqlTypes.VisitType)
export const StatusType = enumType(gqlTypes.AppointmentStatus)
export const UserType = enumType(gqlTypes.UserType)
export const BillStatusType = enumType(gqlTypes.BillStatus)
export const ScheduleStatusType = enumType(gqlTypes.ScheduleStatus)
export const OrderType = enumType({
  name: 'OrderType',
  members: [
    'LESS',
    'LESSEQUAL',
    'GREATER',
    'GREATEREQUAL',
    'EQUAL',
    'NOTEQUAL',
  ],
  description: 'Ordering type based on mathematical comparison',
})

export default [
  SexType,
  VisitType,
  StatusType,
  UserType,
  BillStatusType,
  OrderType,
  ScheduleStatusType,
]
