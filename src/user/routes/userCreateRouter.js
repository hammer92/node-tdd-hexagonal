module.exports = async function (fastify, opts) {
  fastify.get('/user', async function (request, reply) {
    return { root: true }
  })
}
