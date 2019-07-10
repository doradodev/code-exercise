const mongoose = require('mongoose')

const { getModel } = require('./utils')

const TimeEntrySchema = new mongoose.Schema({
    testing: String
})

module.exports = getModel('TimeEntry', TimeEntrySchema)