import { enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

export const SexType = enumType(gqlTypes.Sex)
export const VisitType = enumType(gqlTypes.VisitType)
export const StatusType = enumType(gqlTypes.AppointmentStatus)

export default [SexType, VisitType, StatusType]
