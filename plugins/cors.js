'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-cors'), {
  })
})
