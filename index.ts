import { config } from 'dotenv'
import * as gcp from '@pulumi/gcp'
import { ApolloServer } from 'apollo-server-cloud-functions'
import neo4j from 'neo4j-driver'

// eslint-disable-next-line
const neo4jGraphqlJs = require('neo4j-graphql-js')
const { makeAugmentedSchema } = neo4jGraphqlJs

config()

function factory() {
  const typeDefs = `
type Person {
    name: String
}
`
  const schema = makeAugmentedSchema({ typeDefs })
  const driver = neo4j.driver(
    'bolt://18.208.119.122:32864',
    neo4j.auth.basic('neo4j', 'floor-custody-directions')
  )

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: {
      endpoint: '/dev/graphql',
    },
    context: { driver },
  })

  const cb = server.createHandler()
  return cb
}

const apiFunction = new gcp.cloudfunctions.HttpCallbackFunction('apiFunction', {
  callbackFactory: factory,
})

// eslint-disable-next-line
const apiInvoker = new gcp.cloudfunctions.FunctionIamMember('apiInvoker', {
  cloudFunction: apiFunction.function.id,
  member: 'allUsers',
  role: 'roles/cloudfunctions.invoker',
})

export const url = apiFunction.httpsTriggerUrl
