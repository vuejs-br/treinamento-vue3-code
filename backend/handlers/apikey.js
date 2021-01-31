function CreateApiKeyHandler (db) {
  async function checkIfApiKeyExists (ctx) {
    const { apikey } = ctx.query
    if (!apikey) {
      ctx.status = 400
      ctx.body = { error: 'apikey query param not provided' }
      return
    }
    const users = await db.readAll('users')

    const apiKeyExists = users.map((user) => {
      return user.apiKey.includes(apikey)
    })

    if (apiKeyExists.includes(true)) {
      ctx.status = 200
      return
    }

    ctx.status = 404
  }

  return {
    checkIfApiKeyExists
  }
}

module.exports = CreateApiKeyHandler
