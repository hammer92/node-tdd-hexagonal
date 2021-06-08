const userCreateCaseUse = require('../../application/createCaseUse')

module.exports = ({ database, handleError }) => {
  return ({ body }, reply) => {
    return userCreateCaseUse({
      body,
      database
    }).then((item) => {
      reply.status(201).send({ message: 'Actualizado con exito', item })
    }).catch(handleError(reply))
  }
}
