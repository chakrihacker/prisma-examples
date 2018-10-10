const { User } = require('./User')

describe('User Resolver', () => {
  it('Should resolve User', () => {
    const obj = {
      id: 'unique-id',
      email: 'alice@prisma.io',
      name: 'Alice',
    }

    const args = {}
    const ctx = {}

    const output = User.email(obj, args, ctx)
    expect(output).toEqual('alice@prisma.io')
  })
})
