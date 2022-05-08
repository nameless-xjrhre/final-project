import { mutationField, arg, nonNull } from 'nexus'
import { createPatient } from './Patient.resolver'

export const CreatePatient = mutationField('createPatient', {
  type: 'Patient',
  args: {
    data: nonNull(
      arg({
        type: 'CreatePatientInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createPatient(args.data, context),
})
