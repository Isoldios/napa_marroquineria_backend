const Usuario = require('../models/Usuario');

exports.loginOcrearUsuario = async (req, res) => {
    const { email, nombre, firebaseUid, telefono, direccion, rol } = req.body;

    try {
        let usuario = await Usuario.findOne({ firebaseUid });

        if (usuario) {
            return res.json(usuario);
        } else {
            // Si entra con Google, telefono/direccion vendrán vacíos al principio
            usuario = new Usuario({
                email,
                nombre: nombre || 'Usuario Google',
                firebaseUid,
                telefono: telefono || '',
                direccion: direccion || '',
                rol: rol || 'cliente'
            });
            await usuario.save();
            return res.json(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar perfil (Usado por la pantalla de completar datos)
exports.actualizarPerfil = async (req, res) => {
    try {
        const { telefono, direccion, nombre } = req.body;
        const usuario = await Usuario.findOneAndUpdate(
            { firebaseUid: req.params.uid },
            { telefono, direccion, nombre },
            { new: true }
        );
        res.json(usuario);
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};