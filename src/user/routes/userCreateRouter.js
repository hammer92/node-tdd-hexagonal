const userCreateController = require('../infraestructure/controllers/createController')
const schema = require('../domain/schema/create')
module.exports = async function (fastify, opts) {
  fastify.post('/user', {
    schema
    // preValidation: [fastify.authenticate, fastify.authorized(can.unitCreate)]
  }, userCreateController(fastify))
}
