const Destino = require('../models/Destino')

class DestinoController {
    async cadastrar(req, res) {
                /*
            #swagger.tags = ['Destino'],
            #swagger.parameters['query'] = {
                in: 'query',
                description: 'Cadastra novo destino',
                schema: {
                    $nome: "Lagoa do Peri",
                    $descricao: "Local muito bom para passar o dia com a família, lagoa própria pra banho e com opção de realizar trilha no local, há um restaurante na entrada da lagoa",
                    $cidade: "Florianópolis",
                    $uf: "SC",
                    $coordenadas_geo: "-27.7292638,-48.5559065"
                }
            }

        */

        try {          
            
            const usuario_id = req.userId
            req.query.usuario_id = usuario_id
            
            const nome =  req.query.nome
            const descricao = req.query.descricao
            const cidade = req.query.cidade
            const uf = req.query.uf
            const coordenadas_geo = req.query.coordenadas_geo           

            if (!(usuario_id || nome || descricao || cidade || uf || coordenadas_geo)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }            

            const destino = await Destino.create(req.query)
            await destino.save()

            res.status(201).json(destino)

        } catch (error) {    
            console.log(error.message)        
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do destino' })
        }
    }

    async listar(req, res) { //TODO Ver se os destinos podem ser listados por todos com login
        /*
            #swagger.tags = ['Destino']
        */
        try {
            const destinos = await Destino.findAll()
            res.status(200).json(destinos)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível listar os destinos'})
        }
    }

    async atualizar(req, res) {
        /*
            #swagger.tags = ['Destino']
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
            #swagger.tags = ['Destino']
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
