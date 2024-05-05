const Usuario = require('../models/Usuario')

class UsuarioController {
    async cadastrar(req, res) {
        try {
            const { nome, sexo, cpf, cep, endereco, numero,
                email, data_nascimento, password } = req.body

            if (!(nome || sexo || cpf || cep || endereco || numero
                || email || data_nascimento || password)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }

            const usuario = await Usuario.create(req.body)
            await usuario.validate()
            await usuario.save()

            res.status(201).json(usuario)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do usuário, verifique os dados inseridos' })
        }
    }

    async listar(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(200).json({ erro: 'Usuário não encontrado'})
            }
            if (!(usuario.id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            res.status(200).json(usuario)

        } catch (error) {

            res.status(500).json({ erro: 'Não foi possível encontrar usuário' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!(usuario.id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            await usuario.update(req.body)
            await usuario.save()
            res.status(200).json({ mensagem: 'Alteração efetuada com sucesso' })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar usuário' })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if(!(usuario.id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            await usuario.destroy()
            res.status(200).json({ mensagem: 'Usuário excluído com sucesso' })

        } catch (error) {

            res.status(500).json({ erro: 'Não foi possível excluir usuário' })
        }
    }
}

module.exports = new UsuarioController()
