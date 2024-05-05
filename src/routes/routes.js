const { Router } = require('express')
const loginRoutes = require('./login.routes')
const usuarioRoutes = require('./usuario.routes')
const destinoRoutes = require('./destino.routes')

const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/usuarios', usuarioRoutes)
routes.use('/destinos', destinoRoutes)

module.exports = routes
