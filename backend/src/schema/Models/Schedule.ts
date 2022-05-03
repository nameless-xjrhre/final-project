import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const Schedule = objectType({
  name: 'Schedule',
  definition(t) {
    t.field(gqlTypes.Schedule.id)
    t.field(gqlTypes.Schedule.startTime)
    t.field(gqlTypes.Schedule.endTime)
    t.field('medStaff', {
      type: 'MedicalStaff',
      resolve: (parent, _args, context) =>
        context.prisma.schedule
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .medStaff(),
    })
  },
})

export default Schedule
