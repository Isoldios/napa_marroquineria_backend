const express = require('express');
const router = express.Router();
const auxiliaresController = require('../controllers/auxiliaresController');

// Rutas para Marcas
router.post('/marcas', auxiliaresController.crearMarca);
router.get('/marcas', auxiliaresController.obtenerMarcas);

// Rutas para Categorias
router.post('/categorias', auxiliaresController.crearCategoria);
router.get('/categorias', auxiliaresController.obtenerCategorias);

module.exports = router;