import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const CreateMedicalRecordInput = inputObjectType({
  name: 'CreateMedicalRecordInput',
  definition(t) {
    t.field(gqlTypes.MedicalRecord.patientId)
    t.field(gqlTypes.MedicalRecord.date)
    t.field(gqlTypes.MedicalRecord.prescription)
    t.field(gqlTypes.MedicalRecord.diagnosis)
  },
})

export default [CreateMedicalRecordInput]
