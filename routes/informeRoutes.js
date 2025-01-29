const express = require('express');
const router = express.Router()
const { crearInforme, getInformes, getInforme, actualizarInforme, eliminarInforme, actualizarEstado, getInformesPorRemitente } = require('../controllers/informesController');

router.post('/informes', crearInforme);
router.get('/informes', getInformes);
router.get('/informes/:id', getInforme);
router.get('/remitente/:remitenteId', getInformesPorRemitente);
router.put('/informes/:id', actualizarInforme);
router.delete('/informes/:id', eliminarInforme);
router.patch('/informes/:id', actualizarEstado);

module.exports = router;