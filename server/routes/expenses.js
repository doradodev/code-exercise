const express = require('express')

const router = express.Router()
const Expense = require('../models/Expense')

router.get('/', (req, res) => {
    Expense.find().lean().then(expenses => {
        res.status(200).json(expenses)
    }).catch(e => {
        res.status(500).json(e)
    })
})

router.post('/', (req, res) => {
    Expense.create(req.body).then(expense => {
        res.status(201).json(expense)
    }).catch(e => {
        res.status(500).json(e)
    })
})

module.exports = router