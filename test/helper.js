'use strict'
const path = require('path')

const dotEnvPath = path.resolve('.env')
require('dotenv').config({ path: dotEnvPath })

// This file contains code that we reuse
// between our tests.
const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../app')

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {}
}

// automatically build and tear down our instance
async function build (t) {
  const app = Fastify()

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  await app.register(fp(App), config())

  // await app.database.sequelize.sync()

  // tear down our app after we are done
  t.teardown(app.close.bind(app))

  return app
}

module.exports = {
  config,
  build
}
