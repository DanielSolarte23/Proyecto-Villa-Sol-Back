const { Pago, Apartamento, User } = require('../models'); 

// Crear un nuevo pago
const crearPago = async (req, res) => {
  try {
    const { monto, fechaVencimiento, estado, apartamentoId, propietarioId } = req.body;

    const nuevoPago = await Pago.create({
      monto,
      fechaVencimiento,
      estado,
      apartamentoId,
      propietarioId,
    });

    return res.status(201).json(nuevoPago);
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).json({ error: "Hubo un error al crear el pago.", detalles: error.message });
  }
};

// Obtener todos los pagos
const obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll({
      include: [
        {
          model: Apartamento,
          as: 'apartamento',
          attributes: ['numeroDeApartamento'], 
        },
        {
          model: User,
          as: 'propietario',
          attributes: ['name'], 
        },
      ],
    });

    return res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return res.status(500).json({
      error: "Hubo un error al obtener los pagos.",
      detalles: error.message,
    });
  }
};


// Obtener un pago por su ID
const obtenerPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.findByPk(id, {
      include: [
        {
          model: Apartamento,
          as: 'apartamento',
          attributes: ['numeroDeApartamento'],
        },
        {
          model: User,
          as: 'propietario',
          attributes: ['name'], 
        },
      ],
    });

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    return res.status(200).json(pago);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    return res.status(500).json({ error: "Hubo un error al obtener el pago.", detalles: error.message });
  }
};

// Actualizar un pago
const actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, fechaVencimiento, estado, apartamentoId, propietarioId } = req.body;

    const pago = await Pago.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    pago.monto = monto || pago.monto;
    pago.fechaVencimiento = fechaVencimiento || pago.fechaVencimiento;
    pago.estado = estado || pago.estado;
    pago.apartamentoId = apartamentoId || pago.apartamentoId;
    pago.propietarioId = propietarioId || pago.propietarioId;

    await pago.save();

    return res.status(200).json(pago);
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    return res.status(500).json({ error: "Hubo un error al actualizar el pago.", detalles: error.message });
  }
};

// Eliminar un pago
const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    await pago.destroy();

    return res.status(200).json({ message: "Pago eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    return res.status(500).json({ error: "Hubo un error al eliminar el pago.", detalles: error.message });
  }
};

module.exports = {
  crearPago,
  obtenerPagos,
  obtenerPago,
  actualizarPago,
  eliminarPago,
};
