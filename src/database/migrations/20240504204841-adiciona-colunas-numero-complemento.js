'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'numero' ,{ 
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('usuarios', 'complemento' ,{ 
      type: Sequelize.STRING,
      allowNull: false
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'numero');
    await queryInterface.removeColumn('usuarios', 'complemento');
  }
};
