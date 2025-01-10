'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Visitantes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cedula: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechaHoraIngreso: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaHoraSalida: {
        type: Sequelize.DATE,
        allowNull: true, // Puede ser nulo si no ha salido
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['en ejecucion', 'terminado']],
        },
      },
      apartamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Apartamentos', // Nombre de la tabla relacionada
          key: 'id', // Clave foránea referenciando Apartamentos
        },
        onDelete: 'CASCADE', // Opcional: qué hacer si se elimina el apartamento
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
    await queryInterface.dropTable('Visitantes');
  },
};

