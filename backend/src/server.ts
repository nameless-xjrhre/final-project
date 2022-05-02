import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema'
import { context } from './context'

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context,
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      path: error.path,
      errors: error.originalError?.message.split(','),
    }),
  }),
)

export default app
