'use strict'

const path = require('path')
const glob = require('glob')
const AutoLoad = require('fastify-autoload')

const dotEnvPath = path.resolve('.env')
require('dotenv').config({ path: dotEnvPath })

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  glob.sync(path.join(__dirname, 'src/*/routes')).forEach(function (file) {
    fastify.register(AutoLoad, {
      dir: file,
      options: Object.assign(
        { prefix: `${process.env.API_PREFIX}` },
        opts
      )
    })
  })
}
