/* eslint-disable prefer-const */
// tests/__helpers.ts
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import getPort, { makeRange } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import { join } from 'path'
import { Server } from 'http'
import server from '../server'

const db = new PrismaClient()

type TestContext = {
  client: GraphQLClient
  db: PrismaClient
}

export function createTestContext(): TestContext {
  let ctx = {} as TestContext
  const graphqlCtx = graphqlTestContext()
  const prismaCtx = prismaTestContext()
  beforeEach(async () => {
    const client = await graphqlCtx.before()
    const database = await prismaCtx.before()
    Object.assign(ctx, {
      client,
      database,
    })
  })
  afterEach(async () => {
    await graphqlCtx.after()
    await prismaCtx.after()
  })
  return ctx
}

function graphqlTestContext() {
  let serverInstance: null | Server = null
  return {
    async before() {
      const port = await getPort({ port: makeRange(2000, 6000) })
      serverInstance = await server.listen({ port })
      // Close the Prisma Client connection when the Apollo Server is closed
      serverInstance.on('close', async () => {
        db.$disconnect()
      })

      return new GraphQLClient(`http://localhost:${port}/graphql`)
    },
    async after() {
      serverInstance?.close()
    },
  }
}

function prismaTestContext() {
  const prismaBinary = join(
    __dirname,
    '..',
    '..',
    'node_modules',
    '.bin',
    'prisma',
  )
  let prismaClient: null | PrismaClient = null
  return {
    async before() {
      // Run the migrations to ensure our schema has the required structure
      execSync(`${prismaBinary} db push`)
      // Construct a new Prisma Client connected to the generated schema
      prismaClient = new PrismaClient()
      return prismaClient
    },
    async after() {
      // Turn off database
      prismaClient?.$disconnect()
    },
  }
}
