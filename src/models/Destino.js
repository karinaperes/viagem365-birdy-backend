const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')
const Destino = connection.define('destinos', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uf: {
        type:DataTypes.STRING(2),
        allowNull: false
    },
    coordenadas_geo: {
        type: DataTypes.STRING
    }
})

module.exports = Destino
