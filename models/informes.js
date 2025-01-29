'use strict';

module.exports = (sequelize, DataTypes) => {
  const Informe = sequelize.define('Informe', {
    cargo: {
      type: DataTypes.STRING,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['leido', 'no leido']],
      },
    },
  });
  Informe.associate = (models) => {
    Informe.belongsTo(models.User, {
      foreignKey: 'remitenteId',  
      as: 'remitente',            
    });
  };
  return Informe;
};
