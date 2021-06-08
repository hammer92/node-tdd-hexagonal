const path = require('path')

const dotEnvPath = path.resolve('.env')
require('dotenv').config({ path: dotEnvPath })

module.exports = {
  development: {
    url: process.env.DATABASE_DEV_URL,
    dialect: process.env.DATABASE_DIALECT,
    options: {}
  },
  test: {
    url: process.env.DATABASE_TEST_URL,
    options: {
      logging: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {}
  }
}
