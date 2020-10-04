const { Schema, model } = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const tripulacionSchema = new Schema({
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  cantidad: { type: Number, required: true },
  modelo: { type: String, required: true, maxlength: 50 },
  costo: { type: Number, required: true },
  velocidadMaxima: { type: Number, required: true }
});

tripulacionSchema.plugin(paginate)

const Tripulacion = model("tripulaciones", tripulacionSchema)

module.exports = Tripulacion;
