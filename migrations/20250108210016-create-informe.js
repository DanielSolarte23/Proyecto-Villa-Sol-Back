'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Informes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['leido', 'no leido']],
        },
      },
      remitenteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla relacionada
          key: 'id', // Clave foránea referenciando Users
        },
        onDelete: 'CASCADE', // Opcional: qué hacer si se elimina el User
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Informes');
  },
};
