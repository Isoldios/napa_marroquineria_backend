const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para Login/Registro (Sincronización)
router.post('/login', usuarioController.loginOcrearUsuario);

// Ruta para actualizar perfil
router.put('/:uid', usuarioController.actualizarPerfil);

module.exports = router;