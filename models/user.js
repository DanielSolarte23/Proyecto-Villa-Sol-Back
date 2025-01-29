const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    cedula: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
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
        isIn: [['administrador', 'personal de seguridad']], 
      },
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });


  User.prototype.validatePassword = async function(password) {
    if (!this.password) {
      return false; 
    }
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

