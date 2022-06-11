import { queryField, list } from 'nexus'
import { availableStaffs } from './MedicalStaff.resolver'

const QueryAvailableStaffs = queryField('availableStaffs', {
  type: list('MedicalStaff'),
  resolve: (_parent, args, context) => availableStaffs(context),
})

export default [QueryAvailableStaffs]
