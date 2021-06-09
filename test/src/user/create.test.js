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

const resposerService = (payload) => app.inject({
  method: 'post',
  payload,
  url: '/api/user'
})

t.test('crear usuario', async t => {
  const payload = {
    email: 'user@yopmail.com',
    password: 'password'
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 201, 'returns a status code of 201')
  const { item, message } = JSON.parse(response.payload)
  t.equal(message, 'Actualizado con exito', 'returns a message of Actualizado con exito')
  t.equal(item.email, payload.email, 'returns the email created')
  t.end()
})
//
t.test('Este correo electrónico ya está en uso.', async t => {
  const payload = {
    email: 'user@yopmail.com',
    password: 'password'
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 409)
  const { message } = JSON.parse(response.payload)
  t.equal(message, 'Este correo electrónico ya está en uso.')
})

t.test('email es un campo obligatorio', async t => {
  const payload = {
    password: 'password'
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 400, 'returns a status code of 400')
  const { message } = JSON.parse(response.payload)
  t.equal(message, 'email es un campo obligatorio')
})

t.test('password es un campo obligatorio', async t => {
  const payload = {
    email: 'user@yopmail.com'
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 400)
  const { message } = JSON.parse(response.payload)
  t.equal(message, 'password es un campo obligatorio')
})

t.test('password no puede ser un campo vacío', async t => {
  const payload = {
    email: 'user2@yopmail.com',
    password: ''
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 400, 'returns a status code of 400')
  const { message } = JSON.parse(response.payload)
  t.equal(message, 'password no puede ser un campo vacío')
})

t.test('email no puede ser un campo vacío', async t => {
  const payload = {
    email: '',
    password: 'password'
  }
  const response = await resposerService(payload)
  t.equal(response.statusCode, 400, 'returns a status code of 400')
  const { message } = JSON.parse(response.payload)
  t.equal(message, 'email no puede ser un campo vacío')
})
