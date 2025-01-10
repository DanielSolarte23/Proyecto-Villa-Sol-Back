const { Visitante } = require('../models');

// Obtener todos los visitantes (GET)
const obtenerVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.findAll({
      include: {
        model: Visitante.sequelize.models.Apartamento,
        as: 'apartamento', 
      },
    });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los visitantes.' });
  }
};

// Obtener un visitante por su ID (GET)
const obtenerVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id, {
      include: {
        model: Visitante.sequelize.models.Apartamento,
        as: 'apartamento', 
      },
    });

    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener el visitante.' });
  }
};

// Crear un nuevo Visitante (POST)
const crearVisitante = async (req, res) => {
    try {
      const { nombre, cedula, fechaHoraIngreso, fechaHoraSalida, estado, apartamentoId } = req.body;
  
      if (!nombre || !cedula || !fechaHoraIngreso || !estado || !apartamentoId) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
      }
  
      const nuevoVisitante = await Visitante.create({
        nombre,
        cedula,
        fechaHoraIngreso,
        fechaHoraSalida,
        estado,
        apartamentoId,
      });
      res.status(201).json(nuevoVisitante);
    } catch (error) {
      console.error("Error al crear visitante:", error); // Para ver detalles del error en la consola
      res.status(500).json({ error: 'Hubo un error al crear el visitante.', detalles: error.message });
    }
  };
  

// Actualizar un Visitante existente (PUT o PATCH)
const actualizarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, fechaHoraIngreso, fechaHoraSalida, estado, apartamentoId } = req.body;

    const visitante = await Visitante.findByPk(id);
    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    // Actualiza los campos del visitante con los datos proporcionados
    visitante.nombre = nombre || visitante.nombre;
    visitante.cedula = cedula || visitante.cedula;
    visitante.fechaHoraIngreso = fechaHoraIngreso || visitante.fechaHoraIngreso;
    visitante.fechaHoraSalida = fechaHoraSalida || visitante.fechaHoraSalida;
    visitante.estado = estado || visitante.estado;
    visitante.apartamentoId = apartamentoId || visitante.apartamentoId;

    await visitante.save();

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al actualizar el visitante.' });
  }
};

// Eliminar un Visitante (DELETE)
const eliminarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    await visitante.destroy();
    res.status(200).json({ message: 'Visitante eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al eliminar el visitante.' });
  }
};

module.exports = {
  obtenerVisitantes,
  obtenerVisitante,
  crearVisitante,
  actualizarVisitante,
  eliminarVisitante,
};
