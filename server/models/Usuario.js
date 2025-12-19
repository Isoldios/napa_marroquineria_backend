const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    rol: { 
        type: String, 
        default: 'cliente', // Por defecto todos son clientes
        enum: ['cliente', 'admin'] 
    },
    // Guardamos el ID de Firebase para vincular ambas cuentas
    firebaseUid: { type: String, required: true, unique: true },
    telefono: { type: String, trim: true },
    direccion: { type: String, trim: true },
    creado: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);