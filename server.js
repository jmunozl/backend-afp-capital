const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send({ msg: "Bienvenido Rest App" });
});


app.listen(5000, function () {
  console.log("Node server esta ejecutando en el puerto 5000");
});
