const express = require('express');
const router = express.Router();
const auxiliaresController = require('../controllers/auxiliaresController');

// Rutas para Marcas
router.post('/marcas', auxiliaresController.crearMarca);
router.get('/marcas', auxiliaresController.obtenerMarcas);

// Rutas para Categorias
router.post('/categorias', auxiliaresController.crearCategoria);
router.get('/categorias', auxiliaresController.obtenerCategorias);

// Rutas para Colores
router.post('/colores', auxiliaresController.crearColor);
router.get('/colores', auxiliaresController.obtenerColores);

module.exports = router;