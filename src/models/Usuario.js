const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')
const cpfCheck = require('cpf-check')
const { hash } = require('bcrypt')

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            validaCpf(cpf) {
                if (!cpfCheck.validate(cpf)) {
                    throw new Error('CPF inválido')
                }
            }
        }
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Usuario.beforeSave(async (user) => {    
    user.password = await hash(user.password, 8)
    return user    
})

module.exports = Usuario
