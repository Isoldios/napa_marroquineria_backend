const Usuario = require('../models/Usuario');

exports.loginOcrearUsuario = async (req, res) => {
    const { email, nombre, firebaseUid } = req.body;

    try {
        // 1. Buscamos si el usuario ya existe en Mongo
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            // Si existe, devolvemos sus datos (incluyendo el ROL)
            return res.json(usuario);
        } else {
            // 2. Si no existe (es la primera vez que entra), lo creamos
            usuario = new Usuario({
                email,
                nombre,
                firebaseUid,
                rol: 'cliente' // Por defecto
            });
            await usuario.save();
            return res.json(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

// Función para actualizar datos personales (Dirección/Teléfono)
exports.actualizarPerfil = async (req, res) => {
    try {
        const { telefono, direccion } = req.body;
        const usuario = await Usuario.findOneAndUpdate(
            { firebaseUid: req.params.uid },
            { telefono, direccion },
            { new: true }
        );
        res.json(usuario);
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};