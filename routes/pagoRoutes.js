const express = require('express');
const router = express.Router();
const { crearPago, obtenerPagos, obtenerPago, actualizarPago, eliminarPago } = require('../controllers/pagoController');

// Ruta para crear un pago
router.post('/pago', crearPago);

// Ruta para obtener todos los pagos
router.get('/pago', obtenerPagos);

// Ruta para obtener un pago por su ID
router.get('/pago/:id', obtenerPago);

// Ruta para actualizar un pago
router.put('/pago/:id', actualizarPago);

// Ruta para eliminar un pago
router.delete('/pago/:id', eliminarPago);

module.exports = router;
