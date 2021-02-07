const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('koa-jwt')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const database = require('./database')
const CreateUserHandler = require('./handlers/users')
const CreateAuthHandler = require('./handlers/auth')
const CreateFeedbackHandler = require('./handlers/feedbacks')
const CreateApiKeyHandler = require('./handlers/apikey')

const app = new Koa()
const router = new Router()

const {
  JWT_SECRET = '',
  PORT = 3000
} = process.env
const authMiddleware = jwt({ secret: JWT_SECRET })
app.use(bodyParser())
app.use(cors())

const feedbacksHandler = CreateFeedbackHandler(database)
const usersHandler = CreateUserHandler(database)
const authHandler = CreateAuthHandler(database)
const apiKeyHandler = CreateApiKeyHandler(database)

router.get('/', (ctx) => {
  ctx.status = 200
  ctx.body = { message: new Date() }
})
router.head('/apikey/exists', apiKeyHandler.checkIfApiKeyExists)
router.post('/auth/register', usersHandler.create)
router.post('/auth/login', authHandler.login)
router.get('/users/me', authMiddleware, usersHandler.getLoggerUser)
router.post('/users/me/apikey', authMiddleware, usersHandler.generateApiKey)
router.get('/feedbacks', authMiddleware, feedbacksHandler.getFeedbacks)
router.post('/feedbacks', feedbacksHandler.create)
router.get('/feedbacks/summary', authMiddleware, feedbacksHandler.getSummary)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`)
})

module.exports = app
