// migrations/XXXXXXXXXXXXXX-update-user-model.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // Modificar columnas existentes
      await queryInterface.changeColumn('Users', 'username', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }, { transaction });

      await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('Users', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, { transaction });

      await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });
    });
  }
};
