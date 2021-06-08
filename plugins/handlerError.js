
const fp = require('fastify-plugin')

const ERROR_HANDLERS = {
  SequelizeDatabaseError: (error, reply) => reply.badRequest(error),
  SequelizeUniqueConstraintError: (error, reply) =>
    reply.conflict(error.errors.map(({ message }) => message)),
  ValidationError: (error, reply) =>
    reply.badRequest(error.details.map(({ message }) => message)),
  defaultError: (error, reply) => reply.internalServerError(error)
}
const handleError = (reply) => {
  return error => {
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(error, reply)
  }
}
module.exports = fp(async function (fastify, opts) {
  fastify.decorate('handleError', handleError)
})
