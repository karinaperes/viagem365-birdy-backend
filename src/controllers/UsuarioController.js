const Usuario = require('../models/Usuario')
const { consultaCep } = require('../utils/consultaCep')


class UsuarioController {
    async cadastrar(req, res) {
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Cadastra novo usuário, validação de duplicidade de email e cpf, busca endereço a partir do CEP informado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastra novo usuário',
                schema: {
                    $nome: 'Karina',
                    $sexo: 'Feminino',
                    $cpf: '83526448078',
                    $cep: '88066242',                    
                    $numero: '577',
                    complemento: 'Apto 1',
                    $email: 'email@email.com',
                    $data_nascimento: '1979-03-22',
                    $password: '1234'
                }
            }
        */
        try {
            const { nome, sexo, cpf, cep, numero,
                email, data_nascimento, password } = req.body            

            const { endereco } = await consultaCep(cep)  
            req.body.endereco = endereco         

            if (!(nome || sexo || cpf || cep || numero
                || email || data_nascimento || password)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }

            const cpfExistente = await Usuario.findOne({
                where: {
                    cpf: cpf                    
                }
            })
            const emailExistente = await Usuario.findOne({
                where: {
                    email: email                    
                }
            })

            if (cpfExistente) {
                return res.status(409).json({ mensagem: 'CPF já cadastrado' })
            }
            if (emailExistente) {
                return res.status(409).json({ mensagem: 'E-mail já cadastrado' })
            }           

            const usuario = await Usuario.create(req.body)
            await usuario.validate()
            await usuario.save()

            res.status(201).json(usuario)

        } catch (error) {      
            console.log(error.message)      
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do usuário, verifique os dados inseridos' })
        }        
    }

    async listar(req, res) {
        try {
            /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Lista dados do usuário autenticado',
        */
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
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Atualiza dados do usuário autenticado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza usuário',
                schema: {
                    nome: 'Nome Alterado',
                    sexo: 'Feminino',
                    cpf: '83526448078',
                    cep: '88066242',
                    endereco: 'Servidao Alfredo',
                    numero: '577',
                    complemento: 'Apto 1',
                    email: 'email@email.com',
                    data_nascimento: '1979-03-22',
                    password: '1234'
                }
            }
        */
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
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Exclui usuário autenticado, desde que não tenha locais cadastrados',
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if(!(usuario.id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
            }

            if(!usuario) {
                return res.status(404).json({erro: "Nenhum usuário cadastrado com o id informado."})
            }

            const localUsuario = await Local.findAll({
                where: {
                    usuario_id: id
                }
            })

            if (localUsuario.length > 0) {
                return res.status(400).json({erro: "Este usuário não pode ser excluído pois possui locais cadastrados."})
            }

            await usuario.destroy()
            res.status(200).json({ mensagem: 'Usuário excluído com sucesso' })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Não foi possível excluir usuário' })
        }
    }
}

module.exports = new UsuarioController()
