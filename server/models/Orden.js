const mongoose = require('mongoose');

const OrdenSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // Array de productos comprados
    productos: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            nombre: String,
            cantidad: Number,
            precio: Number,
            color: String // <--- Importante para tus variantes
        }
    ],
    datosEnvio: {
        nombre: String,
        direccion: String,
        telefono: String,
        email: String
    },
    total: { type: Number, required: true },
    estado: {
        type: String,
        default: 'Pendiente',
        enum: ['Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado']
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orden', OrdenSchema);