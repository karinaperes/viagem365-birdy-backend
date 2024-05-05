const { Router } = require('express')
const DestinoController = require('../controllers/DestinoController')
const destinoRoutes = new Router()
const { auth } = require('../middleware/auth')

destinoRoutes.post('/', auth, DestinoController.cadastrar)
destinoRoutes.get('/', auth, DestinoController.listar)
destinoRoutes.put('/:id', auth, DestinoController.atualizar)
destinoRoutes.delete('/:id', auth, DestinoController.excluir)

module.exports = destinoRoutes
