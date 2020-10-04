const router = require('express').Router()
const tripulacionRouter = require('./tripulacion')

router.use('/tripulacion',tripulacionRouter)

module.exports = router