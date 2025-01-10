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
      timestamps: true, // Asegúrate de tener esto
      createdAt: 'createdAt', // Definición del nombre del campo
      updatedAt: 'updatedAt', // Definición del nombre del campo
    });
  
    // Asociaciones
    Apartamento.associate = (models) => {
      Apartamento.belongsTo(models.User, {
        foreignKey: 'propietarioId',
        as: 'propietario',
      });
  
      Apartamento.hasMany(models.Visitante, {
        foreignKey: 'apartamentoId',
        as: 'visitantes',
      });
  
      Apartamento.hasMany(models.Pago, {
        foreignKey: 'numeroDeApartamento',
        as: 'pagos',
      });
    };
  
    return Apartamento;
  };
  