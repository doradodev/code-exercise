const express = require('express')

const router = express.Router()
const TimeEntry = require('../models/TimeEntry')

router.get('/', (req, res) => {
    TimeEntry.find().lean().then(timeEntries => {
        res.status(200).json(timeEntries)
    }).catch(e => {
        res.status(500).json(e)
    })
})

router.post('/', (req, res) => {

    TimeEntry.create(req.body).then(timeEntry => {
        res.status(201).json(timeEntry)
    }).catch(e => {
        res.status(500).json(e)
    })
})

module.exports = router