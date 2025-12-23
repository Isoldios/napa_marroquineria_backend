const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken } = require('../middleware/auth');

router.post('/login', usuarioController.loginOcrearUsuario);
router.put('/:uid', verificarToken, usuarioController.actualizarPerfil);

module.exports = router;