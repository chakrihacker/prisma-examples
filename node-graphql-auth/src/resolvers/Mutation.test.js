const { Mutation } = require('./Mutation')
const { prisma } = require('../generated/prisma-client')

describe('Mutation test', () => {
  it('Should Resolve signup', () => {
    const obj = {}

    const args = {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: '123456789',
    }
    const ctx = {
      db: prisma,
    }

    const output = Mutation.signup(obj, args, ctx)
    expect(output.token).toEqual('generated-token')
  })
})
