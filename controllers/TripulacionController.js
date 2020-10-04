const mongoose = require("mongoose")
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

    await models.Tripulacion.findOne({nombre: tripulacionData.nombre})
      .then((tripulacionNombre) => {
          if (!tripulacionNombre) {
            models.Tripulacion.create(tripulacionData)
              .then((tripulacion) => {
                res.status(201).json({status: `La Tripulación '${tripulacion.nombre}' fue creada`})
              }).catch(err => {
              res.json({'Error creando tripulación': err})
            })
          } else {
            res.status(200).json({message: `La Tripulacion '${tripulacionNombre.nombre}' ya esta registrada`})
          }
        }
      )
  } catch (error) {
    res.status(500).json({message: `Ocurrio un error : ${error} `})
    next(error)
  }

}

async function list(req, res, next) {
  try {
    const getPagination = (page, size) => {
      const limit = size ? +size : 3;
      const offset = page ? page * limit : 0;
      return {limit, offset};
    }

    const {page, size, nombre} = req.query
    const query = nombre ? {nombre: {$regex: new RegExp(nombre), $options: "i"}} : {}
    const {limit, offset} = getPagination(page, size);
    const labelsCustom = {
      docs: 'tripulaciones',
      totalDocs: 'totalTripulaciones'
    }
    const options = {
      select: 'nombre cantidad modelo costo velocidadMaxima',
      limit: limit,
      offset: offset,
      page: page,
      customLabels: labelsCustom
    }
    await models.Tripulacion.paginate(query, options)
      .then((result) => {
        const {totalTripulaciones} = result;
        if (totalTripulaciones > 0) {
          res.status(200).json({result});
        } else {
          res.status(200).json({message: "No existen tripulaciones registradas"})
        }
      })
      .catch((err) => {
        res.json({message: `Error listando tripulaciones ->  ${err}`});
      });
  } catch (error) {
    res.status(500).json({message: `Ocurrio un error -> ${error} `})
    next(error);
  }
}

async function getById(req, res, next) {

  const {id} = req.query
  try {

    if (id === undefined || id === '') {
      res.json({message: 'Error buscando tripulación'})
    } else {
      const tripulacion = await models.Tripulacion.findById({_id: id}, {__v: 0}).exec()
      if (tripulacion) {
        res.status(200).json({tripulacion})
      } else {
        res.status(200).json({message: "No se encontro tripulación"})
      }
    }

  } catch (error) {
    res.status(500).json({message: `Ocurrio un error -> ${error} `})
    next(error);
  }
}

async function deleteById(req, res, next) {

  const {id} = req.query

  try {
    if (id === undefined || id === '') {
      res.json({message: 'Error eliminando tripulación'})
    } else {
      if (validateId(id)) {
        const tripulacion = await models.Tripulacion.findByIdAndDelete({_id: id}, {__v: 0}).exec()
        if (tripulacion) {
          res.status(200).json({message: `La Tripulación '${tripulacion.nombre}' ha sido eliminada exitosamente.`})
        } else {
          res.status(200).json({message: 'No existe tripulación para eliminar'})
        }
      } else {
        res.status(200).json({message: 'Formato ID incorrecto'})
      }
    }

  } catch (error) {
    res.status(500).json({message: `Ocurrio un error -> ${error} `})
    next(error);
  }
}

async function updateById(req, res, next) {

  const {id, nombre, cantidad, modelo, costo, velocidadMaxima} = req.body
  const query = {_id: id}

  let update = {
    nombre: nombre,
    cantidad: cantidad,
    modelo: modelo,
    costo: costo,
    velocidadMaxima: velocidadMaxima
  }
  clearNullAndUndefined(update)
  try {
    if (id === undefined || id === '') {
      res.json({message: 'Error actualizando tripulación'})
    } else {
      if (validateId(id)) {
        await models.Tripulacion.findByIdAndUpdate(query, update)
          .then(tripulacionUpdate => {
            if (tripulacionUpdate !== null) {
              res.status(200).json({message: 'Tripulación actualizada correctamente'})
            } else {
              res.status(200).json({message: 'Tripulación no existe'})
            }
          }).catch((err) => {
            res.json({message: `Error actulizando tripulación ->  ${err}`});
          })
      } else {
        res.status(200).json({message: 'Formato ID incorrecto'})
      }
    }
  } catch (error) {
    res.status(500).json({message: `Ocurrio un error -> ${error} `})
    next(error);
  }
}

function validateId(id) {
  return !!id.match(/^[0-9a-fA-F]{24}$/);
}

function clearNullAndUndefined(obj) {
  for (let name in obj) {
    if (obj[name] === null || obj[name] === undefined) {
      delete obj[name];
    }
  }
}

module.exports = {add, list, getById, deleteById, updateById}
