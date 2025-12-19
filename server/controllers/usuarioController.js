const Usuario = require('../models/Usuario');

exports.loginOcrearUsuario = async (req, res) => {
    const { email, nombre, firebaseUid, telefono, direccion, rol } = req.body;

    try {
        let usuario = await Usuario.findOne({ firebaseUid });

        if (usuario) {
            return res.json(usuario);
        } else {
            usuario = new Usuario({
                email: email || '',
                nombre: nombre || 'Usuario Nuevo',
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