const admin = require('../config/firebase');
const Usuario = require('../models/Usuario');

const verificarToken = async (req, res, next) => {
    // 1. Buscamos el token en el Header "Authorization"
    const header = req.headers.authorization;
    
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No autorizado. Falta token.' });
    }

    // El formato es "Bearer <token_largo>", separamos el texto
    const token = header.split(' ')[1];

    try {
        // 2. Le preguntamos a Firebase si el token es real
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // 3. Si es real, guardamos la info de Firebase en la petición
        req.userFirebase = decodedToken; 

        // 4. (Opcional pero recomendado) Buscamos al usuario en NUESTRA base de datos
        // para saber su rol (admin o cliente)
        const usuarioDb = await Usuario.findOne({ firebaseUid: decodedToken.uid });
        
        if (!usuarioDb) {
            return res.status(401).json({ msg: 'Usuario no registrado en base de datos.' });
        }

        // Adjuntamos el usuario de Mongo a la petición para usarlo en los controllers
        req.usuario = usuarioDb;

        next(); // ¡Pase usted!
    } catch (error) {
        console.error('Error verificando token:', error);
        res.status(401).json({ msg: 'Token inválido o expirado.' });
    }
};

// Middleware Extra: Solo para Admins
const esAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Acceso denegado. Se requiere ser Administrador.' });
    }
};

module.exports = { verificarToken, esAdmin };