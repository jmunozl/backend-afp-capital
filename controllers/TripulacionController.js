const { model } = require("mongoose")
const models = require("../models")

async function add(req, res, next) {
  try {
    const tripulacionData = {
      nombre: req.body.nombre,
      cantidad: req.body.cantidad,
      modelo: req.body.modelo,
      costo: req.body.costo,
      velocidadMaxima: req.body.velocidadMaxima,
    }

    await models.Tripulacion.findOne({ nombre: tripulacionData.nombre }).then(
      (tripulacionNombre) => {
        console.log('entro');
        if (!tripulacionNombre) {          
          models.Tripulacion.create(tripulacionData)
          .then((tripulacion) => {
            res.status(201).json({ status: ` Tripulación ${tripulacion.nombre} creada` })
          }).catch(err=>{
            res.json({'Error creando tripulación':err})
          })
        } else {
          res.status(200).json({message:`Tripulacion ${tripulacionNombre.nombre} ya esta registrada`})
        }
      }
    )
  } catch (error) {
    res.status(500).json({message:`Ocurrio un error : ${error} `})
    next(error)
  }
  
}

async function listc(req,res,next) {
  try {
    await models.Tripulacion.find({},{__v:0})
    .then(tripulacionList =>{
      if (tripulacionList.length >0) {
        res.status(200).json({ tripulaciones: tripulacionList });
      } else {
        res.status(200).json({message:'No existen tripulaciones registradas'})
      }
    }).catch(err=>{
      res.json({message:`Error listando tripulaciones ->  ${err}`})
    })
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error : ${error} ` });
    next(error);
  }
}


async function list(req, res, next) {
  try {
    /*
     nombre: { type: String, required: true, maxlength: 50, unique: true },
  cantidad: { type: Number, required: true },
  modelo: { type: String, required: true, maxlength: 50 },
  costo: { type: Number, required: true },
  velocidadMaxima: { type: Number, required: true },
    */
    const query = {};
    const options = {
      select: 'nombre cantidad modelo costo velocidadMaxima',
      limit: 2,
    }
    await models.Tripulacion.paginate(query, options)
      .then((tripulaciones) => {
        console.log(tripulaciones);
        const { totalDocs } = tripulaciones;
        if (totalDocs > 0) {
          res.status(200).json({ tripulaciones });
        } else {
          res
            .status(200)
            .json({ message: "No existen tripulaciones registradas" });
        }
      })
      .catch((err) => {
        res.json({ message: `Error listando tripulaciones ->  ${err}` });
      });
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error : ${error} ` });
    next(error);
  }
}



module.exports = {add,list}
