const mongoose = require('mongoose');

const MarcaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true // Evita duplicados
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Marca', MarcaSchema);