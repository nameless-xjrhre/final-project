import { mutationField, arg, nonNull } from 'nexus'
import { createUser, validateCreateUser } from './User.resolver'

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'CreateUserInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createUser(args.data, context),
  validate: async (rules, args, context) =>
    validateCreateUser(args.data, context),
})
