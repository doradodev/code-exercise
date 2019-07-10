const mongoose = require('mongoose')

const { getModel } = require('./utils')

const ExpenseSchema = new mongoose.Schema({
    testing: String
})

module.exports = getModel('Expense', ExpenseSchema)