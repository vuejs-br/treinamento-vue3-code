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

    if (!FEEDBACK_TYPES[String(type).toUpperCase()]) {
      ctx.status = 422
      ctx.body = { error: 'Unknown feedback type' }
      return
    }

    const feedback = {
      text,
      fingerprint,
      id: uuidv4(),
      type: String(type).toUpperCase(),
      device,
      page,
      createdAt: new Date().getTime()
    }

    const inserted = await db.insert('feedback', feedback)
    if (inserted) {
      ctx.status = 201
      ctx.body = feedback
      return
    }

    ctx.status = 422
    ctx.body = { error: 'Feedback not created' }
  }

  async function getFeedbacks (ctx) {
    let {
      type,
      limit = 5,
      offset = 0
    } = ctx.query
    let feedbacks = await db.readAll('feedbacks')

    feedbacks = feedbacks.filter((feedback) => {
      return feedback.apiKey === ctx.state.user.apiKey
    })

    if (type) {
      feedbacks = feedbacks.filter((feedback) => {
        return feedback.type === type
      })
    }

    if (limit > 10) {
      limit = 5
    }
    if (offset > limit) {
      offset = limit
    }

    feedbacks = feedbacks.slice(offset, limit)

    ctx.status = 200
    ctx.body = feedbacks || []
  }

  async function getFeedbacksByFingerprint (ctx) {
    const { fingerprint } = ctx.request.query
    const feedbacks = await db.readAll('feedbacks')
    const feedbacksFiltered = feedbacks.map((feedback) => {
      return feedback.fingerprint === fingerprint
    })

    ctx.status = 200
    ctx.body = feedbacksFiltered || []
  }

  async function getFeedbackById (ctx) {
    const { id } = ctx.params
    const feedback = await db.readOneById('feedback', id)
    if (!feedback) {
      ctx.status = 404
      ctx.body = { error: 'Feedback not found' }
      return
    }
    ctx.status = 200
    ctx.body = feedback
  }

  return {
    create,
    getFeedbacks,
    getFeedbacksByFingerprint,
    getFeedbackById
  }
}

module.exports = CreateFeedbackHandler
