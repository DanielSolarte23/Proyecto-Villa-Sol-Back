module.exports = (sequelize, DataTypes) => {
  const Apartamento = sequelize.define('Apartamento', {
      numeroDeApartamento: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      bloque: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      metros: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      estado: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: [['ocupado', 'desocupado', 'mantenimiento']],
          },
      },
  }, {
      timestamps: true, // Incluye createdAt y updatedAt
      createdAt: 'createdAt', // Nombre del campo para la fecha de creación
      updatedAt: 'updatedAt', // Nombre del campo para la última actualización
  });
  Apartamento.associate = (models) => {
      Apartamento.belongsTo(models.Propietario, {
          foreignKey: 'propietarioId', 
          as: 'propietario', 
      });

      // Relación con Visitantes
      Apartamento.hasMany(models.Visitante, {
          foreignKey: 'apartamentoId',
          as: 'visitantes',
      });

      // Relación con Pagos
      Apartamento.hasMany(models.Pago, {
          foreignKey: 'numeroDeApartamento',
          as: 'pagos',
      });
  };
// 3154344556 
  return Apartamento;
};
