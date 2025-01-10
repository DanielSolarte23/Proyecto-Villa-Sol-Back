'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pagos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      monto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fechaVencimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['pendiente', 'cancelado']],
        },
      },
      apartamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Apartamentos',
          key: 'id',
        },
        onDelete: 'CASCADE', // Elimina pagos cuando se elimina el apartamento
      },
      propietarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Permite que este campo sea NULL
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL', // Si el usuario se elimina, se establece NULL en este campo
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
    await queryInterface.dropTable('Pagos');
  },
};
