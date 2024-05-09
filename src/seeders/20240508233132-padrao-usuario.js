'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Usuario1',
      sexo: 'Feminino',
      cpf: '83526448078',
      cep: '88066242',
      numero: '577',
      complemento: 'Apto 1',
      email: 'email@email.com',
      data_nascimento: '1979-03-22',
      password: '1234',
      createdAt: new Date,
      updatedAt: new Date
    }], {
      nome: 'Usuario2',
      sexo: 'Masculino',
      cpf: '98928028027',
      cep: '88066407',
      numero: '200',
      complemento: '',
      email: 'email1@email.com',
      data_nascimento: '1937-03-28',
      password: '12345',
      createdAt: new Date,
      updatedAt: new Date
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});

  }
};
