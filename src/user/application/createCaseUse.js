const userEntity = require('../domain/entities/userEntity')
const repository = require('../infraestructure/repositories/createRepository')

module.exports = async ({ body = {}, createRepository = null, database }) => {
  if (createRepository === null) createRepository = repository(database)

  const { value, error } = userEntity.validate(body, { stripUnknown: true })
  if (error) throw error

  return createRepository(value)
}
