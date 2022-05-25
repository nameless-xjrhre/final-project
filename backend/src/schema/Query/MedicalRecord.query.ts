import { queryField, nonNull, intArg, list } from 'nexus'

// get medical record of patient by id
const QueryMedicalRecord = queryField('medicalRecordsByPatient', {
  type: list('MedicalRecord'),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) =>
    context.prisma.medicalRecord.findMany({
      where: {
        patientId: args.id,
      },
    }),
  validate: async (parent, args, context) => {
    // check if patient exists
    const patient = await context.prisma.patient.findFirst({
      where: {
        id: args.id,
      },
    })
    if (!patient) {
      throw new Error('Patient not found')
    }
  },
})

export default [QueryMedicalRecord]
