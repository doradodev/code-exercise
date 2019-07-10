const mongoose = require('mongoose')

const { getModel } = require('./utils')

const TimeEntrySchema = new mongoose.Schema({
    entryDate: String,
    userName: String,
    comment: String,
    billable: String,
    amount: String
})

module.exports = getModel('TimeEntry', TimeEntrySchema)