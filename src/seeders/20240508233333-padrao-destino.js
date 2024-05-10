'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('destinos', [
      {
      usuario_id: 2,
      nome: 'Conceição da Ibitipoca',
      descricao: 'Um dos cartões postais de Ibitipoca é a Janela do Céu. Tanta fama se justifica simplesmente pela paisagem única: trata-se de uma cachoeira que, em conjunto com o cenário, transforma-se em uma janela incrível.',
      cidade: 'Lima Duarte',
      uf: 'Minas Gerais',
      coordenadas_geo: '-21.7184119,-43.9313667',
      createdAt: new Date,
      updatedAt: new Date
      },
      {
      usuario_id: 1,
      nome: 'PETAR - Parque Estadual Turístico do Alto Ribeira',
      descricao: 'Parque estadual com Mata Atlântica preservada, mais de 350 cavernas, cachoeiras, rios e quatro centros de visitantes.',
      cidade: 'Iporanga',
      uf: 'São Paulo',
      coordenadas_geo: '-24.551436,-48.6828329',
      createdAt: new Date,
      updatedAt: new Date
      }  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('destinos', null, {});

  }
};
