// server/models/Producto.js
const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true // Elimina espacios vacíos al inicio y final
    },
    marca: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: false,
        trim: true
    },
    categoria: {
        type: String, // Ej: "Carteras", "Billeteras", "Cinturones"
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0 // Si no pones stock, arranca en 0 por seguridad
    },
    imagen: {
        type: String, 
        // Aquí guardaremos la URL de la foto (https://firebasestorage...)
        // No es obligatoria al inicio por si cargas el producto sin foto
        required: false 
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);