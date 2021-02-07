const { v4: uuidv4 } = require('uuid')

const FEEDBACK_TYPES = {
  ISSUE: 'ISSUE',
  IDEA: 'IDEA',
  OTHER: 'OTHER'
}

function CreateFeedbackHandler (db) {
  async function create (ctx) {
    const {
      type,
      text,
      apiKey,
      fingerprint,
      device,
      page
    } = ctx.request.body

    if (!type) {
      ctx.status = 400
      ctx.body = { error: 'type is empty' }
    }
    if (!text) {
      ctx.status = 400
      ctx.body = { error: 'text is empty' }
    }
    if (!fingerprint) {
      ctx.status = 400
      ctx.body = { error: 'fingerprint is empty' }
    }
    if (!device) {
      ctx.status = 400
      ctx.body = { error: 'device is empty' }
    }
    if (!page) {
      ctx.status = 400
      ctx.body = { error: 'page is empty' }
    }
    if (!apiKey) {
      ctx.status = 400
      ctx.body = { error: 'apiKey is empty' }
    }

    if (!FEEDBACK_TYPES[String(type).toUpperCase()]) {
      ctx.status = 422
      ctx.body = { error: 'Unknown feedback type' }
      return
    }

    // @TODO: for this, I don't validate if apikey is valid.
    // Just for study purposes.

    const feedback = {
      text,
      fingerprint,
      id: uuidv4(),
      apiKey,
      type: String(type).toUpperCase(),
      device,
      page,
      createdAt: new Date().getTime()
    }

    const inserted = await db.insert('feedbacks', feedback)
    if (inserted) {
      ctx.status = 201
      ctx.body = feedback
      return
    }

    ctx.status = 422
    ctx.body = { error: 'Feedback not created' }
  }

  async function getFeedbacks (ctx) {
    const { type } = ctx.query
    let offset = ctx.query.offset ? Number(ctx.query.offset) : 0
    let limit = ctx.query.limit ? Number(ctx.query.limit) : 5

    let [
      user,
      feedbacks
    ] = await Promise.all([
      db.readOneById('users', ctx.state.user.id),
      db.readAll('feedbacks')
    ])

    if (!user) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized' }
      return
    }

    feedbacks = feedbacks.filter((feedback) => {
      return user.apiKey.includes(feedback.apiKey)
    })

    if (type) {
      feedbacks = feedbacks.filter((feedback) => {
        return feedback.type === String(type).toUpperCase()
      })
    }

    const total = feedbacks.length

    if (limit > 10) {
      limit = 5
    }
    if (offset > limit) {
      offset = limit
    }

    feedbacks = feedbacks.slice(offset, feedbacks.length).slice(0, limit)

    ctx.status = 200
    ctx.body = {
      results: feedbacks || [],
      pagination: { offset, limit, total }
    }
  }

  async function getSummary (ctx) {
    const { type } = ctx.query
    let [
      user,
      feedbacks
    ] = await Promise.all([
      db.readOneById('users', ctx.state.user.id),
      db.readAll('feedbacks')
    ])

    if (!user) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized. User not found with this token' }
      return
    }

    feedbacks = feedbacks.filter((feedback) => {
      return user.apiKey.includes(feedback.apiKey)
    })

    if (type) {
      feedbacks = feedbacks.filter((feedback) => {
        return feedback.type === String(type).toUpperCase()
      })
    }

    let all = 0
    let issue = 0
    let idea = 0
    let other = 0

    feedbacks.forEach((feedback) => {
      all++

      if (feedback.type === 'ISSUE') {
        issue++
      }
      if (feedback.type === 'IDEA') {
        idea++
      }
      if (feedback.type === 'OTHER') {
        other++
      }
    })

    ctx.status = 200
    ctx.body = { all, issue, idea, other }
  }

  return {
    create,
    getFeedbacks,
    getSummary
  }
}

module.exports = CreateFeedbackHandler
