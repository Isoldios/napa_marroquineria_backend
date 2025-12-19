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
        console.log("--> INTENTO DE ACTUALIZAR PERFIL");
        console.log("UID Recibido:", req.params.uid);
        console.log("Datos nuevos:", req.body);

        const { telefono, direccion, nombre } = req.body;
        
        // Buscamos por firebaseUid (que es el ID largo de Google/Firebase)
        const usuario = await Usuario.findOneAndUpdate(
            { firebaseUid: req.params.uid }, 
            { telefono, direccion, nombre },
            { new: true } // Esto es vital para que devuelva el dato nuevo y no el viejo
        );

        if (!usuario) {
            console.log("--> ERROR: Usuario no encontrado en BD con ese UID");
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        
        console.log("--> ACTUALIZACIÓN EXITOSA:", usuario);
        res.json(usuario);

    } catch (error) {
        console.log("--> ERROR SERVIDOR:", error);
        res.status(500).send('Error al actualizar');
    }
};