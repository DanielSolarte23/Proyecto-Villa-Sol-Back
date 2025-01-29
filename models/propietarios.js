'use strict';

module.exports = (sequelize, DataTypes) => {
  const Propietario = sequelize.define('Propietario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    telefono: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: { 
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { 
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  });

  Propietario.associate = (models) => {
    Propietario.hasMany(models.Pago, {
      foreignKey: 'propietarioId',
      as: 'pagos',
    });
    
    Propietario.hasMany(models.Apartamento, {
      foreignKey: 'propietarioId',
      as: 'apartamentos',
    });
  };

  return Propietario;
};
