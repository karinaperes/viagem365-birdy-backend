const { Router } = require('express')
const loginRoutes = require('./login.routes')
const usuarioRoutes = require('./usuario.routes')
const destinoRoutes = require('./destino.routes')

const routes = Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/login', loginRoutes)
routes.use('/usuario', usuarioRoutes)
routes.use('/local', destinoRoutes)

module.exports = routes
