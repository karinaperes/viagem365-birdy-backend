'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('destinos', 'createdAt', { 
      type: Sequelize.DATE,
      allowNull:false 
    });
    await queryInterface.addColumn('destinos', 'updatedAt', { 
      type: Sequelize.DATE,
      allowNull:false 
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('destinos', 'createdAt');
    await queryInterface.removeColumn('destinos', 'updatedAt');
  }
};
