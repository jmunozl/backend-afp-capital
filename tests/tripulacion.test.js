let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let server = require('../server')
let serverError = ''
let IdTest = ''

chai.should()
chai.use(chaiHttp)

describe('Crews API REST', () => {

  describe("POST /api/crews", () => {
    it('It should POST a new crew', (done) => {
      const crew = {
        "nombre": "CREW TEST",
        "cantidad": 10,
        "modelo": "TEST",
        "costo": 10000,
        "velocidadMaxima": 5052
      }
      chai.request(server)
        .post('/api/crews')
        .send(crew)
        .end((err, response) => {
          expect(err).to.be.null
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq(`La Tripulación '${crew.nombre}' fue creada`)
          done()
        })
    });

    it('It should NOT POST a new crew', (done) => {
      const crew = {
        "nombre": "CREW TEST",
        "cantidad": 10,
        "modelo": "TEST",
        "costo": 10000,
        "velocidadMaxima": 5052
      }
      chai.request(server)
        .post('/api/crews')
        .send(crew)
        .end((err, response) => {
          expect(err).to.be.null
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq(`La Tripulación '${crew.nombre}' ya esta registrada`)
          done()
        })
    });

    it('It should NOT POST a new crew bad request', (done) => {
      const crew = {
        "cantidad": 10,
        "modelo": "TEST",
        "costo": 10000,
        "velocidadMaxima": 5052
      }
      chai.request(server)
        .post('/api/crews')
        .send(crew)
        .end((err, response) => {
          response.should.have.status(400)
          response.body.should.be.a('object')
          response.body.should.have.property('Error creando tripulación')
          done()
        })
    });

  })

  describe("GET /api/crews", () => {
    it('It should GET all the crews', (done) => {
      chai.request(server)
        .get('/api/crews')
        .end((err, response) => {
          expect(err).to.be.null
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('tripulaciones')
          IdTest = response.body.should.have.property('tripulaciones').__flags.object[0]._id
          done()
        })
    });

    it('It should NOT GET all the crews bad url', (done) => {
      chai.request(server)
        .get('/api/crew')
        .end((err, response) => {
          expect(err).to.be.null
          response.should.have.status(404)
          done()
        })
    });

    it('It should NOT GET all the crews', (done) => {
      chai.request(server)
        .get('/api/crews')
        .end((err, response) => {
          if (response.status === 404) {
            response.should.have.status(404)
            response.body.should.have.property('message').eq('No existen tripulaciones registradas')
          }
          done()
        })
    });

  })

  describe("GET /api/crews/:id", () => {
    it('It should GET a crew by ID', (done) => {
      chai.request(server)
        .get(`/api/crews/${IdTest}`)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('nombre')
          response.body.should.have.property('cantidad')
          response.body.should.have.property('modelo')
          response.body.should.have.property('costo')
          response.body.should.have.property('velocidadMaxima')
          response.body.should.have.property('_id').eq(IdTest)
          done()
        })
    });

    it('It should NOT GET a crew by ID', (done) => {
      const crewID = '5f7b14dceb2ffd3a2c93a0a8'
      chai.request(server)
        .get(`/api/crews/${crewID}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    });

    it('It should NOT GET a crew by ID Incorrect', (done) => {
      const crewID = '1'
      chai.request(server)
        .get(`/api/crews/${crewID}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('Formato ID incorrecto')
          done()
        })
    });

    it('It should NOT GET a crew by ID url invalid', (done) => {
      const crewID = '5f7b34bceccd2845ef6a4acc'
      chai.request(server)
        .get(`/api/crew/${crewID}`)
        .end((err, response) => {
          response.should.have.status(404)
          done()
        })
    });

  })

  describe("UPDATE /api/crews/:id", () => {

    it('It should UPDATE a crew by ID', (done) => {
      const crew = {
        "nombre": "CREW TEST UPDATE",
        "cantidad": 99,
        "modelo": "TEST UPDATE",
        "costo": 78954,
        "velocidadMaxima": 7851
      }
      chai.request(server)
        .put(`/api/crews/${IdTest}`)
        .send(crew)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('Tripulación actualizada correctamente')
          done()
        })
    });

    it('It should NOT UPDATE a crew by ID', (done) => {
      const crewID = '5f7b14dceb2ffd3a2c93a0a7'
      const crew = {
        "nombre": "CREW TEST UPDATE",
        "cantidad": 99,
        "modelo": "TEST UPDATE",
        "costo": 78954,
        "velocidadMaxima": 7851
      }
      chai.request(server)
        .put(`/api/crews/${crewID}`)
        .send(crew)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('Tripulación no existe')
          done()
        })
    });

    it('It should NOT UPDATE a crew by ID incorrect', (done) => {
      const crewID = '1'
      const crew = {
        "nombre": "CREW TEST UPDATE",
        "cantidad": 99,
        "modelo": "TEST UPDATE",
        "costo": 78954,
        "velocidadMaxima": 7851
      }
      chai.request(server)
        .put(`/api/crews/${crewID}`)
        .send(crew)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('Formato ID incorrecto')
          done()
        })
    });
  })

  describe("DELETE /api/crews/:id", () => {

    it('It should DELETE a crew by ID', (done) => {

      chai.request(server)
        .delete(`/api/crews/${IdTest}`)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    });

    it('It should NOT DELETE a crew by ID', (done) => {
      const crewID = '5f7b14dceb2ffd3a2c93a0a7'
      chai.request(server)
        .delete(`/api/crews/${crewID}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('No existe tripulación para eliminar')
          done()
        })
    });

    it('It should NOT DELETE a crew by ID incorrect', (done) => {
      const crewID = '1'
      chai.request(server)
        .delete(`/api/crews/${crewID}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message').eq('Formato ID incorrecto')
          done()
        })
    });


  })

})



