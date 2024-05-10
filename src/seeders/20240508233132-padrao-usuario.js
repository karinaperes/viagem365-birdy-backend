'use strict';
const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
      nome: 'Usuario1',
      sexo: 'Feminino',
      cpf: '83526448078',
      cep: '88066242',
      endereco: 'Servidao Alfredo Manoel Vieira',
      numero: '577',
      complemento: 'Apto 1',
      email: 'email@email.com',
      data_nascimento: '1979-03-22',
      password: await hash('1234', 8),
      createdAt: new Date,
      updatedAt: new Date
      },
      {
      nome: 'Usuario2',
      sexo: 'Masculino',
      cpf: '98928028027',
      cep: '88066407',
      endereco: '3',
      numero: '200',
      complemento: '',
      email: 'email1@email.com',
      data_nascimento: '1937-03-28',
      password: await hash('12345', 8),
      createdAt: new Date,
      updatedAt: new Date
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});

  }
};
