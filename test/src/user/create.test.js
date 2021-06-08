'use strict'

const t = require('tap')
const { build } = require('../../helper')
let app = null

t.before(async () => {
  app = await build(t)
  await app.database.User.sync()
  await app.database.User.bulkCreate([
    { email: 'admin@yopmail.com', password: 'password' },
    { email: 'demo@yopmail.com', password: 'password' }
  ])
})

t.teardown(async () => {
  await app.database.User.drop()
})

t.test('create user', async t => {
  const payload = {
    email: 'user@yopmail.com',
    password: 'password'
  }
  const response = await app.inject({
    method: 'post',
    payload,
    url: '/api/user'
  })
  t.equal(response.statusCode, 201, 'returns a status code of 201')
  const { item, message } = JSON.parse(response.payload)
  t.equal(message, 'Actualizado con exito', 'returns a message of Actualizado con exito')
  t.equal(item.email, payload.email, 'returns the email created')
  t.end()
})

//
// t.test('first', async t => {
//   t.beforeEach((t) => {
//     t.context.app = build(t)
//   })
//   t.test('default root route', async (t) => {
//     const res = await t.context.app.inject({
//       url: '/api/user'
//     })
//     t.same(JSON.parse(res.payload), { root: true })
//   })
//   t.test('apple', async t => {
//     t.pass('apples are tasty')
//   })
//   t.test('banana', async t => {
//     t.pass('bananas are yellow')
//   })
// })
