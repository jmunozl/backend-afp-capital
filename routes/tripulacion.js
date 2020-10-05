const router = require('express').Router()
const cors = require('cors')
const {add, list, getById, deleteById, updateById} = require('../controllers/TripulacionController')

router.use(cors())

router.post('/', ((req, res, next) => {
  try {
    add(req, res, next)
  } catch (error) {
    console.log(error);
  }
}))

router.get("/", (req, res, next) => {
  try {
    list(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.get("/:id", (req, res, next) => {
  try {
    getById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.delete("/:id", (req, res, next) => {
  try {
    deleteById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})

router.put("/:id", (req, res, next) => {
  try {
    updateById(req, res, next)
  } catch (error) {
    console.log(error);
  }
})


module.exports = router
