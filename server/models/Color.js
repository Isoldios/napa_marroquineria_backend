const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    // Podríamos guardar el código Hexadecimal para mostrar la bolita de color en el front
    codigoHex: { 
        type: String, 
        default: '#000000' 
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Color', ColorSchema);