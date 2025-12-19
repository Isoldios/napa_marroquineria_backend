const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    marca: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, trim: true },
    imagen: { type: String },
    
    // Switch para saber qué lógica usar
    tieneColores: { 
        type: Boolean, 
        default: false 
    },
    
    // Si tieneColores = false, usamos este campo (stock simple)
    // Si tieneColores = true, este campo será la SUMA automática de los colores
    stock: { 
        type: Number, 
        required: true,
        default: 0 
    },

    // Si tieneColores = true, usamos este array
    stockPorColor: [
        {
            nombre: { type: String }, // Ej: "Rojo"
            cantidad: { type: Number, default: 0 } // Ej: 5
        }
    ],

    creado: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Producto', ProductoSchema);