import { inputObjectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { SexType } from '../Enums'

const CreatePatientInput = inputObjectType({
  name: 'CreatePatientInput',
  definition(t) {
    t.field(gqlTypes.Patient.firstName)
    t.field(gqlTypes.Patient.lastName)
    t.nonNull.field('sex', {
      type: SexType,
    })
    t.field(gqlTypes.Patient.dateOfBirth)
    t.field(gqlTypes.Patient.contactNum)
    t.field(gqlTypes.Patient.address)
  },
})

const EditPatientInput = inputObjectType({
  name: 'EditPatientInput',
  definition(t) {
    t.int('id')
    t.string('firstName')
    t.string('lastName')
    t.field('sex', {
      type: SexType,
    })
    t.date('dateOfBirth')
    t.string('contactNum')
    t.string('address')
  },
})

export default [CreatePatientInput, EditPatientInput]
