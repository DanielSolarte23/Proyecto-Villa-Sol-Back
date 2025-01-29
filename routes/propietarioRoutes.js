const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietariosController');
 
router.post('/propietario/', propietarioController.createPropietario);
router.get('/propietario/', propietarioController.getAllPropietarios);
router.get('/propietario/:id', propietarioController.getPropietarioById);
router.put('/propietario/:id', propietarioController.updatePropietario);
router.delete('/propietario/:id', propietarioController.deletePropietario);

module.exports = router;
