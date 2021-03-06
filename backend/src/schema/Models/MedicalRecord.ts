import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const MedicalRecord = objectType({
  name: 'MedicalRecord',
  definition(t) {
    t.field(gqlTypes.MedicalRecord.id)
    t.field(gqlTypes.MedicalRecord.date)
    t.field(gqlTypes.MedicalRecord.diagnosis)
    t.field('patient', {
      type: 'Patient',
      resolve: (parent, _args, context) =>
        context.prisma.medicalRecord
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .patient(),
    })
    t.field('medStaff', {
      type: 'MedicalStaff',
      resolve: (parent, _args, context) =>
        context.prisma.medicalRecord
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .medStaff(),
    })
    t.field(gqlTypes.MedicalRecord.prescription)
  },
})

export default MedicalRecord
