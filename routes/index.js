const router = require('express').Router()
const tripulacionRouter = require('./tripulacion')

router.use('/crews',tripulacionRouter)

module.exports = router
