'use strict'
const fs = require('fs')
const path = require('path')
const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

const config = require('../database/config')[process.env.NODE_ENV]

/**
 * This plugins adds some utilities to connection database
 *
 * @see https://sequelize.org/master/index.html
 */
module.exports = fp(async function (fastify, opts) {
  const db = {}
  const logging = (...msg) => fastify.log.warn(...msg)
  const sequelize = new Sequelize(config.url, Object.assign({ logging }, config.options))
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  // loading models
  const pathModels = path.join(process.env.APP_PATH, 'database', 'models')
  fs
    .readdirSync(pathModels)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== pathModels) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const model = require(path.join(pathModels, file))(sequelize, Sequelize.DataTypes)
      db[model.name] = model
    })

  // inicial associate
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize
  fastify.decorate('database', db)
})
