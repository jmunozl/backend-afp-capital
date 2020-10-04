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
        if (!tripulacionNombre) {          
          models.Tripulacion.create(tripulacionData)
          .then((tripulacion) => {
            res.status(201).json({ status: `La Tripulación '${tripulacion.nombre}' fue creada` })
          }).catch(err=>{
            res.json({'Error creando tripulación':err})
          })
        } else {
          res.status(200).json({message:`La Tripulacion '${tripulacionNombre.nombre}' ya esta registrada`})
        }
      }
    )
  } catch (error) {
    res.status(500).json({message:`Ocurrio un error : ${error} `})
    next(error)
  }
  
}

async function list(req, res, next) {
  try {
    const getPagination = (page, size) => {
      const limit = size ? +size : 3;
      const offset = page ? page * limit : 0;
      return { limit, offset };
    }
    
    const { page, size, nombre } = req.query
    const query = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};    
    const { limit, offset } = getPagination(page, size);    
    const labelsCustom={
      docs:'tripulaciones',
      totalDocs:'totalTripulaciones'
    }
    const options = {
      select: 'nombre cantidad modelo costo velocidadMaxima',
      limit: limit,
      offset:offset,
      page:page,
      customLabels:labelsCustom
    }
    await models.Tripulacion.paginate(query, options)
      .then((result) => {
        const { totalTripulaciones } = result;
        if (totalTripulaciones > 0) {
          res.status(200).json({ result });
        } else {
          res.status(200).json({ message: "No existen tripulaciones registradas" });
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
