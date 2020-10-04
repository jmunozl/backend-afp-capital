const router = require('express').Router()
const cors = require('cors')
const {add, list, getById, deleteById, updateById} = require('../controllers/TripulacionController')

router.use(cors())

router.post('/add', ((req, res, next) => {
  try {
    add(req, res, next)
  } catch (error) {
    console.log(error);
  }
}))

router.get("/list", (req, res, next) => {
  try {
    list(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.get("/findById", (req, res, next) => {
  try {
    getById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.delete("/findByIdAndDelete", (req, res, next) => {
  try {
    deleteById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.put("/findByIdAndUpdate", (req, res, next) => {
  try {
    updateById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})


module.exports = router
