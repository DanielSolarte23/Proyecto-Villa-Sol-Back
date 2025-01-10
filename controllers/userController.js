const { User, Apartamento } = require('../models');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un usuario
exports.createUser = async (req, res) => {
  try {
    const { name, cedula, phone, username, password, role } = req.body;
    const newUser = await User.create({ name, cedula, phone, username, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cedula, phone, username, password, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.update({ name, cedula, phone, username, password, role });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPropietarios = async (req, res) => {
  try {
    const propietarios = await User.findAll({
      include:{
        model: Apartamento,
        as:'apartamento',
        attributes:['numeroDeApartamento']
      },
      where: { role: 'propietario' }

    });

    return res.status(200).json(propietarios);
  } catch (error) {
    console.error("Error al obtener propietarios:", error);
    return res.status(500).json({ error: "Hubo un error al obtener los propietarios." });
  }
};
