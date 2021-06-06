'use strict'

const fp = require('fastify-plugin')
const path = require('path')

/**
 * This Plugin for serving static files as fast as possible.
 *
 * @see https://github.com/fastify/fastify-static
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-static'), {
    root: path.join(process.env.PATH, 'public'),
    prefix: '/public/' // optional: default '/'
  })
})
