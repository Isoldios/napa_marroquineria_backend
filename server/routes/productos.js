const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// api/productos

// Crear (POST)
router.post('/', productoController.crearProducto);

// Obtener todos (GET)
router.get('/', productoController.obtenerProductos);

// Actualizar (PUT) - Requiere pasar el ID en la URL
router.put('/:id', productoController.actualizarProducto);

// Eliminar (DELETE) - Requiere pasar el ID en la URL
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;