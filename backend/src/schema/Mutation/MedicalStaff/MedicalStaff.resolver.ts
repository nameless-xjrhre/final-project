import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type CreateMedicalStaffType = NexusGenInputs['CreateMedicalStaffInput']

export function createMedicalStaff(
  medicalStaff: CreateMedicalStaffType,
  ctx: Context,
) {
  return ctx.prisma.medicalStaff.create({
    data: {
      firstName: medicalStaff.firstName,
      lastName: medicalStaff.lastName,
      contactNum: medicalStaff.contactNum,
      address: medicalStaff.address,
    },
  })
}
