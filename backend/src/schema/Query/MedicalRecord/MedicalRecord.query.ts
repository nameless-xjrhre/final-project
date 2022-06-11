import { queryField, nonNull, intArg, list } from 'nexus'
import {
  getMedicalRecordByPatientId,
  validateMedicalRecord,
} from './MedicalRecord.resolver'

// get medical record of patient by id
const QueryMedicalRecord = queryField('medicalRecordsByPatient', {
  type: list('MedicalRecord'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    getMedicalRecordByPatientId(context, args),
  validate: async (parent, args, context) =>
    validateMedicalRecord(context, args),
})

export default [QueryMedicalRecord]
