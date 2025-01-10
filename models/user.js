const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    cedula: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Cambiar a true para permitir que sea NULL
      validate: {
        notEmpty: {
          msg: 'El nombre de usuario no puede estar vacío',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña no puede estar vacía',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['administrador', 'personal de seguridad', 'propietario']], // Solo se permiten estos valores
      },
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        // Si no es propietario, encriptamos la contraseña
        if (user.role !== 'propietario') {
          user.password = await bcrypt.hash(user.password, 10);
        } else {
          // Si es propietario, eliminamos los campos de contraseña y usuario
          user.username = null; // Se establece a null
          user.password = null; // Se establece a null
        }
      },
    },
  });

  // Método de instancia para validar contraseñas
  User.prototype.validatePassword = async function(password) {
    if (!this.password) {
      return false; // Si no hay contraseña (por ejemplo, para 'propietario'), devolvemos falso
    }
    return await bcrypt.compare(password, this.password);
  };

  // Definir las relaciones
  User.associate = (models) => {
    User.hasOne(models.Apartamento, {
      foreignKey: 'propietarioId',
      as: 'apartamento',
    });
    User.hasMany(models.Informe, {
      foreignKey: 'remitenteName',
      as: 'informes',
    });
  };

  return User;
};
