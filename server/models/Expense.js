const mongoose = require('mongoose')

const { getModel } = require('./utils')

const ExpenseSchema = new mongoose.Schema({
    incurredDate: String,
    memo: String,
    userName: String,
    amount: String,
    billable: String,
    account: String
})

module.exports = getModel('Expense', ExpenseSchema)