module.exports = {
  tags: ['Users'],
  description: 'Crear User',
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' }
    }
  },
  response: {
    201: {
      type: 'object',
      required: ['message', 'item'],
      properties: {
        message: { type: 'string' },
        item: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  }
}
