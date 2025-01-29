const { sequelize } = require('../models');
const { Propietario, Pago, Apartamento } = require('../models');

// Crear un propietario
exports.createPropietario = async (req, res) => {
  const { nombre, cedula, telefono, apartamentoId } = req.body; 

  try {
    // Validar que los campos obligatorios estén presentes
    if (!nombre || !cedula || !apartamentoId) {
      return res.status(400).json({
        error: "El nombre, la cédula y el ID del apartamento son obligatorios.",
      });
    }

    // Buscar el apartamento para asegurarnos de que exista y que no tenga un propietario asignado
    const apartamento = await Apartamento.findByPk(apartamentoId);

    if (!apartamento) {
      return res.status(404).json({ error: "El apartamento no existe." });
    }

    if (apartamento.propietarioId !== null) {
      return res.status(400).json({
        error: "El apartamento ya tiene un propietario asignado.",
      });
    }

    const nuevoPropietario = await Propietario.create({
      nombre,
      cedula,
      telefono,
    });

    apartamento.propietarioId = nuevoPropietario.id;
    await apartamento.save();

    return res.status(201).json({
      propietario: nuevoPropietario,
      apartamento,
    });
  } catch (error) {

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "La cédula ingresada ya está registrada." });
    }

    console.error("Error al crear el propietario con apartamento:", error);
    return res.status(500).json({
      error: "Ocurrió un error al crear el propietario con apartamento.",
      detalles: error.message,
    });
  }
};



exports.getAllPropietarios = async (req, res) => {
  try {
    // Ejecutar la consulta SQL para obtener propietarios con sus apartamentos y estado de pago
    const propietarios = await sequelize.query(
      `
      SELECT 
  p.id AS propietarioId,
  p.nombre,
  p.cedula,
  p.telefono,
  a.id AS apartamentoId, -- Añade el ID del apartamento
  a.numeroDeApartamento AS apartamentoNumero,
  a.bloque AS apartamentoBloque,
  p.createdAt AS propietarioCreado,
  CASE 
      WHEN COUNT(pa.id) = 0 THEN 'pendiente'
      WHEN COUNT(pa.id) > 0 AND SUM(pa.estado = 'pendiente') > 0 THEN 'pendiente'
      ELSE 'al dia'
  END AS estadoPago
FROM 
  Propietarios p
LEFT JOIN 
  Pagos pa ON p.id = pa.propietarioId
LEFT JOIN 
  Apartamentos a ON p.id = a.propietarioId
GROUP BY 
  p.id, a.id, a.numeroDeApartamento, a.bloque, p.nombre, p.cedula, p.telefono, p.createdAt
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Respuesta con propietarios, apartamentos y estado de pago
    res.status(200).json(propietarios);
  } catch (error) {
    console.error('Error al obtener propietarios:', error);
    res.status(500).json({
      error: "Error al obtener propietarios.",
      detalles: error.message,
    });
  }
};




// Obtener un propietario por ID
exports.getPropietarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const propietario = await Propietario.findByPk(id, {
      include: [
        { model: Pago, as: 'pagos' },
        { model: Apartamento, as: 'apartamentos' },
      ],
    });

    if (!propietario) {
      return res.status(404).json({ error: 'Propietario no encontrado' });
    }

    res.status(200).json(propietario);
  } catch (error) {
    console.error('Error al obtener propietario:', error);
    res.status(500).json({ error: "Ocurrió un error al obtener el propietario", detalles: error.message });
  }
};


exports.updatePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono, apartamentoId } = req.body;

    const propietario = await Propietario.findByPk(id);
    if (!propietario) {
      return res.status(404).json({ error: 'Propietario no encontrado' });
    }

    // Solo actualiza si se pasan valores nuevos
    propietario.nombre = nombre || propietario.nombre;
    propietario.cedula = cedula || propietario.cedula;
    propietario.telefono = telefono || propietario.telefono;
    propietario.apartamentoId = apartamentoId || propietario.apartamentoId;

    await propietario.save();
    res.status(200).json(propietario);
  } catch (error) {
    console.error('Error al actualizar propietario:', error);
    res.status(400).json({ error: error.message });
  }
};


exports.deletePropietario = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el propietario por su ID
    const propietario = await Propietario.findByPk(id);
    if (!propietario) {
      return res.status(404).json({ error: 'Propietario no encontrado' });
    }

    // Actualizar los pagos asociados para guardar el nombre del propietario y desvincularlo
    await Pago.update(
      {
        propietario_nombre: propietario.nombre, // Asegúrate de tener este campo en el modelo `Pago`
        propietarioId: null, // Desvincular el ID del propietario
      },
      {
        where: { propietarioId: id }, // Filtrar por el ID del propietario
      }
    );

    // Eliminar el propietario
    await propietario.destroy();

    res.status(200).json({ message: 'Propietario eliminado y pagos actualizados exitosamente' });
  } catch (error) {
    console.error('Error al eliminar propietario:', error);
    res
      .status(500)
      .json({ error: 'Ocurrió un error al eliminar el propietario', detalles: error.message });
  }
};

