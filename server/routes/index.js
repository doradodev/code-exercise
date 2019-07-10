const express = require('express')

const router = express.Router()

router.use('/expenses', require('./expenses'))
router.use('/time-entries', require('./time-entries'))

module.exports = router