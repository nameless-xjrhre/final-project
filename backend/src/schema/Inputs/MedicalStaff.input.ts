import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const CreateMedicalStaffInput = inputObjectType({
  name: 'CreateMedicalStaffInput',
  definition(t) {
    t.field(gqlTypes.MedicalStaff.firstName)
    t.field(gqlTypes.MedicalStaff.lastName)
    t.field(gqlTypes.MedicalStaff.contactNum)
    t.field(gqlTypes.MedicalStaff.address)
  },
})

export default [CreateMedicalStaffInput]
