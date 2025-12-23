const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');
const { verificarToken, esAdmin } = require('../middleware/auth');

// Crear orden: Solo usuarios logueados
router.post('/', verificarToken, ordenController.crearOrden);

// Ver mis compras: Solo el dueño de la cuenta (Validamos el token)
router.get('/usuario/:userId', verificarToken, ordenController.obtenerOrdenesUsuario);

// Admin: Ver todas y cambiar estado
router.get('/admin', verificarToken, esAdmin, ordenController.obtenerTodas);
router.put('/:id', verificarToken, esAdmin, ordenController.actualizarEstado);

module.exports = router;