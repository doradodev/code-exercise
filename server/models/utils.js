const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise
const winston = require('winston')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/keystone_code_exercise'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
    winston.error('[MongoDB] Error in DB connection: ' + err)
})

mongoose.connection.on('reconnected', () => {
    winston.info('[MongoDB] Reconnected')
})

mongoose.connection.on('connected', () => {
    winston.info(`[MongoDB] Connected`)
})

mongoose.connection.on('disconnected', () => {
    winston.info('[MongoDB] Disconnected')
})


const getModel = (name, schema) => {
    if (mongoose.models[name]) return mongoose.model(name)
    return mongoose.model(name, schema)
}

module.exports = {
    getModel
}