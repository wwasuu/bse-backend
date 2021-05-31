const Sequelize = require('sequelize')
const CONFIG = require('../config')

const sequelize = new Sequelize(CONFIG.DB_NAME, CONFIG.DB_USERNAME, CONFIG.DB_PASSWORD, {
    host: CONFIG.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
    logging: false,
  })

module.exports = sequelize