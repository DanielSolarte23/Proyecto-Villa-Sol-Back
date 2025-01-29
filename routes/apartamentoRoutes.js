const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentoController');


router.get('/apartamentos', apartamentoController.getApartamentos);
router.get('/apartamentos/:id', apartamentoController.getApartamentos);
router.get('/apartamentosSinPropietario', apartamentoController.getApartamentosSinPropietario);
router.post('/apartamentos', apartamentoController.crearApartamento);


router.put('/apartamentos/:id', apartamentoController.actualizarApartamento);


router.delete('/apartamentos/:id', apartamentoController.eliminarApartamento);

module.exports = router;
