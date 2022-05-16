import { enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

export const SexType = enumType(gqlTypes.Sex)
export const VisitType = enumType(gqlTypes.VisitType)
export const StatusType = enumType(gqlTypes.AppointmentStatus)
export const UserType = enumType(gqlTypes.UserType)
export const BillStatusType = enumType(gqlTypes.BillStatus)

export default [SexType, VisitType, StatusType, UserType, BillStatusType]
