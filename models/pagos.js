'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pendiente', 'cancelado']],
      },
    },
  });

  // Relación con Apartamento y User (Propietario)
  Pago.associate = (models) => {
    // Relación con Apartamento
    Pago.belongsTo(models.Apartamento, {
      foreignKey: 'apartamentoId',  // Cambié este campo para que se refiera al id de Apartamento
      as: 'apartamento',
    });

    // Relación con User (Propietario)
    Pago.belongsTo(models.User, {
      foreignKey: 'propietarioId',  // Cambié el campo para hacer referencia al id de User
      as: 'propietario',
    });
  };

  return Pago;
};
