'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pendiente', 'cancelado', 'pagado']],
      },
    },
    propietario_nombre: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Pago.associate = (models) => {
    Pago.belongsTo(models.Propietario, {
      foreignKey: 'propietarioId',
      as: 'propietario',
    });
  
    Pago.belongsTo(models.Apartamento, {
      foreignKey: 'apartamentoId',
      as: 'apartamento',
    });
  };
  
  return Pago;
};
