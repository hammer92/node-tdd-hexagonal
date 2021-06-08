const Joi = require('joi')
module.exports = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'email no es valido',
    'string.empty': 'email no puede ser un campo vacío',
    'any.required': 'email es un campo obligatorio'
  }),
  password: Joi.string().required()
})
