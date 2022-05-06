import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'
import { SexType } from '../Enums'

const Patient = objectType({
  name: 'Patient',
  definition(t) {
    t.field(gqlTypes.Patient.id)
    t.field(gqlTypes.Patient.firstName)
    t.field(gqlTypes.Patient.lastName)
    t.nonNull.field('sex', {
      type: SexType,
    })
    t.field(gqlTypes.Patient.dateOfBirth)
    t.field(gqlTypes.Patient.contactNum)
    t.field(gqlTypes.Patient.address)
    t.field('fullName', {
      type: 'String',
      resolve: (parent) => `${parent.firstName} ${parent.lastName}`,
    })
    t.nonNull.list.nonNull.field('appointments', {
      type: 'Appointment',
      resolve: (parent, _args, context) =>
        context.prisma.appointment.findMany({
          where: {
            patient: {
              id: parent.id,
            },
          },
        }),
    })
    t.nonNull.list.nonNull.field('hospitalBills', {
      type: 'HospitalBill',
      resolve: (parent, _args, context) =>
        context.prisma.hospitalBill.findMany({
          where: {
            patient: {
              id: parent.id,
            },
          },
        }),
    })
  },
})

export default Patient
