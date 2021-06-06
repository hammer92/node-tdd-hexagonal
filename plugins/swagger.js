'use strict'

const fp = require('fastify-plugin')

/**
 *A Fastify plugin for serving a Swagger UI, using Swagger (OpenAPI v2) or OpenAPI v3
 * schemas automatically generated from your route schemas, or from an existing Swagger/OpenAPI schema.
 *
 * @see https://github.com/fastify/fastify-swagger
 */
module.exports = fp(async function (fastify, opts) {
  const host = (process.env.NODE_ENV === 'development')
    ? [process.env.API_HOST, process.env.PORT].join(':')
    : process.env.API_HOST

  fastify.register(require('fastify-swagger'), {
    routePrefix: [process.env.API_PREFIX, process.env.API_SWAGGER].join('/'),
    exposeRoute: true,
    swagger: {
      host,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [{ bearerAuth: [] }],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  })
})
