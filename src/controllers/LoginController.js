const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')

class LoginController {
    async logar(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password
           
            if (!email) {
                return res.status(400).json({ erro: 'Informe o email' })
            }
            if (!password) {
                return res.status(400).json({ erro: 'Informe a senha' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email, password: password}
            })
            if (!usuario) {
                return res.status(404).json({ erro: 'Email e senha não correspondem a nenhum usuário' })
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ Token: token })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: 'Solicitação não pôde ser atendida' })            
        }
    }
}

module.exports = new LoginController()
