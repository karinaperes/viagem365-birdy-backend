const Usuario = require('../models/Usuario')
const { consultaCep } = require('../utils/consultaCep')


class UsuarioController {
    async cadastrar(req, res) {
        /*
            #swagger.tags = ['Usuario'],
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
            #swagger.tags = ['Usuario']
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
            #swagger.tags = ['Usuario']
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if(!(usuario.id === req.userId)) {
                return res.status(403).json({ erro: 'Acesso não autorizado' })
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
