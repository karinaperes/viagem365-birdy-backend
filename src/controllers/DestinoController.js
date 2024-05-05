const Destino = require('../models/Destino')

class DestinoController {
    async cadastrar(req, res) {
        try {
            const { usuario_id, nome, descricao, cidade, uf, coordenadas_geo } = req.body

            if (!(usuario_id || nome || descricao || cidade || uf || coordenadas_geo)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }

            const destino = await Destino.create(req.body)
            await destino.save()

            res.status(201).json(destino)

        } catch (error) {            
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do destino' })
        }
    }

    async listar(req, res) { //TODO Ver se os destinos podem ser listados por todos com login
        try {
            const destinos = await Destino.findAll()
            res.status(200).json(destinos)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível listar os destinos'})
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if (!(destino.usuario_id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            await destino.update(req.body)
            await destino.save()
            res.status(200).json({ mensagem: 'Alteração efetuada com sucesso' })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar destino' })            
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if(!(destino.usuario_id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível excluir o destino' })
        }
    }

}

module.exports = new DestinoController()
