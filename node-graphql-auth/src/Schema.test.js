const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  buildSchemaFromTypeDefinitions,
} = require('graphql-tools')

const { graphql } = require('graphql')

const Schema = require('./schema.graphql')

const getUserTest = {
  id: 'Get User',
  query: `
    query {
      me {
        id
        name
        email
      }
    }
  `,
  variables: {},
  context: {
    Authorization: 'token',
  },
  expected: {
    data: {
      me: {
        id: 'unique-id',
        name: 'Alice',
        email: 'alice@prisma.io',
      },
    },
  },
}

describe('Schema', function() {
  const cases = [getUserTest]
  const mockSchema = makeExecutableSchema({ typeDefs: Schema })

  const mockMap = {
    User: (root, args, context, info) => {
      return {
        id: 'unique-id',
        name: 'Alice',
        email: 'alice@prisma.io',
      }
    },
  }

  // Return payload of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: mockMap,
    preserveResolvers: true,
  })

  test('should have valid schema', async () => {
    expect(async () => {
      const MockServer = mockServer(Schema)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })

  cases.forEach(function(obj) {
    const { id, query, variables, context: ctx, expected } = obj
    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables),
      ).resolves.toEqual(expected)
    })
  })
})
