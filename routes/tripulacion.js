const router = require('express').Router()
const cors = require('cors')
const { models } = require('mongoose')
const {add,list} = require('../controllers/TripulacionController')

router.use(cors())

router.post('/add',((req,res,next)=>{
  try {
    add(req,res,next)
  } catch (error) {
    console.log(error);
  }
}))

router.get("/list", (req, res, next) => {
  try {
    list(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router