const jwt = require('jsonwebtoken')

function CreateAuthHandler (db) {
  async function login (ctx) {
    const { email, password } = ctx.request.body
    const user = await db.readOneByEmail('users', email)

    if (!user) {
      ctx.status = 404
      ctx.body = { error: 'Not found' }
      return
    }

    const canLogin = () => (
      user.email === email &&
      user.password === password
    )

    if (!canLogin()) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized' }
      return
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name
    }, process.env.JWT_SECRET)

    ctx.status = 200
    ctx.body = { token }
  }

  return { login }
}

module.exports = CreateAuthHandler
