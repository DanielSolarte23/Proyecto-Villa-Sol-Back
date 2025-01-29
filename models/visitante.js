'use strict';

module.exports = (sequelize, DataTypes) => {
  const Visitante = sequelize.define('Visitante', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaHoraIngreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaHoraSalida: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['en ejecucion', 'terminado']],
      },
    },
  });

  Visitante.beforeSave((visitante) => {
    visitante.estado = visitante.fechaHoraSalida ? 'terminado' : 'en ejecucion';
  });  

  // Relación con Apartamento
  Visitante.associate = (models) => {
    Visitante.belongsTo(models.Apartamento, {
      foreignKey: 'apartamentoId',
      as: 'apartamento',
    });
  };

  return Visitante;
};
