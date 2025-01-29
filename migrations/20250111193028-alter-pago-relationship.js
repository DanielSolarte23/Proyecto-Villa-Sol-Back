'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la relación actual con 'User'
    await queryInterface.removeColumn('pagos', 'propietarioId');

    // Agregar la nueva relación con 'Propietario'
    await queryInterface.addColumn('pagos', 'propietarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'propietarios',  // Cambié User por Propietarios
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios, eliminando la relación con 'Propietario'
    await queryInterface.removeColumn('pagos', 'propietarioId');

    // Restaurar la relación con 'User'
    await queryInterface.addColumn('pagos', 'propietarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};
