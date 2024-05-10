const { userInfo } = require('os')
const Destino = require('../models/Destino')
const { consultaCidade } = require('../utils/consultaCidade')

class DestinoController {
    async cadastrar(req, res) {
                /*
            #swagger.tags = ['Local'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastra novo destino',
                schema: {
                    $nome: "Lagoa do Peri",
                    $descricao: "Local muito bom para passar o dia com a família, lagoa própria pra banho e com opção de realizar trilha no local, há um restaurante na entrada da lagoa",
                    $coordenadas_geo: "-27.7292638,-48.5559065"
                }
            }
        */

        try {          
            
            const usuario_id = req.userId
            req.body.usuario_id = usuario_id
            
            const nome =  req.body.nome
            const descricao = req.body.descricao
            const coordenadas_geo = req.body.coordenadas_geo           

            if (!(usuario_id || nome || descricao || cidade || uf || coordenadas_geo)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }

            const coordenadasExistente = await Destino.findOne({
                where: {
                    usuario_id: usuario_id,
                    coordenadas_geo: coordenadas_geo                    
                }
            })
            if (coordenadasExistente) {
                return res.status(409).json({ mensagem: 'Coordenadas já foram cadastradas para o usuário' })
            }
            
            if (coordenadas_geo) {
                const { cidade, uf } = await consultaCidade(coordenadas_geo)

                if (cidade && uf) {
                    req.body.cidade = cidade
                    req.body.uf = uf                    
                } else {
                    throw new Error('Não foi possível encontrar a cidade e estado para as coordenadas fornecidas')
                }
            }

            const destino = await Destino.create(req.body)
            await destino.save()

            res.status(201).json(destino)

        } catch (error) {    
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do destino' })
        }
    }

    async listar(req, res) {
        /*
            #swagger.tags = ['Local']
        */
        try {            
            const userId = req.userId
            const destinos = await Destino.findAll({
                where: {
                    usuario_id: userId
                }
            })
            res.status(200).json(destinos)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível listar os destinos'})
        }
    }

    async listarUm(req, res) {
        /*
            #swagger.tags = ['Local']
        */
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if (!(destino.usuario_id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            res.status(200).json(destino)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Não foi possível listar o destino'})
        }
    }

    async atualizar(req, res) {
        /*
            #swagger.tags = ['Local'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza local',
                schema: {
                    nome: 'Nome Alterado',
                    descricao: "Local muito bom para passar o dia com a família, lagoa própria pra banho e com opção de realizar trilha no local, há um restaurante na entrada da lagoa",
                    coordenadas_geo: "-27.7292638,-48.5559080"
                }
            }
        */
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
        /*
            #swagger.tags = ['Local']
        */
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
