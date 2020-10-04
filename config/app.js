const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Routers = require("../routes");
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use("/api", Routers);

app.get("/", function (req, res) {
  res.send({ message: "Welcome Rest App" });
});

module.exports = app