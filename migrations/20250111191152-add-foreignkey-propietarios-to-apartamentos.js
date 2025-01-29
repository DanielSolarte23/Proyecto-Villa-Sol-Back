'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('apartamentos', {
      fields: ['propietarioId'],
      type: 'foreign key',
      name: 'fk_propietario_apartamento', 
      references: {
        table: 'propietarios', 
        field: 'id',           
      },
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE',  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('apartamentos', 'fk_propietario_apartamento');
  }
};
