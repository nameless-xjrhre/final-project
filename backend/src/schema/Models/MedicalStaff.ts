import { objectType, list } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import Schedule from './Schedule'

const MedicalStaff = objectType({
  name: 'MedicalStaff',
  definition(t) {
    t.field(gqlTypes.MedicalStaff.id)
    t.field(gqlTypes.MedicalStaff.firstName)
    t.field(gqlTypes.MedicalStaff.lastName)
    t.field(gqlTypes.MedicalStaff.contactNum)
    t.field(gqlTypes.MedicalStaff.address)
    t.field('schedules', {
      type: list(Schedule),
      resolve: (parent, _args, context) =>
        context.prisma.medicalStaff
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .Schedule(),
    })
  },
})

export default MedicalStaff
