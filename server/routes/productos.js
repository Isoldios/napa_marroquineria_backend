const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { verificarToken, esAdmin } = require('../middleware/auth');

// Rutas Públicas (Cualquiera ve el catálogo)
router.get('/', productoController.obtenerProductos);
// router.get('/:id', productoController.obtenerProducto);

// Rutas Protegidas (Solo Admin)
router.post('/', verificarToken, esAdmin, productoController.crearProducto);
router.put('/:id', verificarToken, esAdmin, productoController.actualizarProducto);
router.delete('/:id', verificarToken, esAdmin, productoController.eliminarProducto);

module.exports = router;