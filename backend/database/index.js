const database = require('./mock')

function wait (timeMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}

async function update (col, id, data) {
  if (!database[col]) {
    return false
  }

  database[col] = database[col].map(item => {
    if (item.id === id) {
      return { ...item, ...data }
    }

    return item
  })

  await wait(500)
  return true
}

async function readAll (col) {
  await wait(2500)
  if (!database[col]) {
    return []
  }

  return database[col].sort((a, b) => b.createdAt - a.createdAt)
}

async function insert (col, data) {
  if (!database[col]) {
    database[col] = []
  }

  database[col].push(data)
  await wait(500)
  return true
}

async function readOneById (col, id) {
  if (!database[col]) return
  const res = database[col].find(item => String(item.id) === String(id))

  await wait(500)
  return res
}

async function readOneByEmail (col, email) {
  if (!database[col]) return
  const res = database[col].find(item => String(item.email) === String(email))

  await wait(500)
  return res
}

module.exports = {
  update,
  insert,
  readAll,
  readOneById,
  readOneByEmail
}
