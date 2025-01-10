'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apartamentos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      numeroDeApartamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bloque: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      metros: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['ocupado', 'desocupado', 'mantenimiento']],
        },
      },
      propietarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Nombre de la tabla relacionada
          key: 'id', // Clave foránea referenciando Users
        },
        onDelete: 'SET NULL', // Opcional: qué hacer si se elimina el propietario
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
    await queryInterface.dropTable('Apartamentos');
  },
};
