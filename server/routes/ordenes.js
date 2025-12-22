const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

// Ruta para crear orden
router.post('/', ordenController.crearOrden);

// Ruta para que el usuario vea SUS compras
router.get('/usuario/:userId', ordenController.obtenerOrdenesUsuario);

// Rutas ADMIN
router.get('/admin', ordenController.obtenerTodas);
router.put('/:id', ordenController.actualizarEstado);

module.exports = router;