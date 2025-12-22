const Orden = require('../models/Orden');

// 1. Crear Orden (Lo usa el Carrito)
exports.crearOrden = async (req, res) => {
    try {
        const nuevaOrden = new Orden(req.body);
        await nuevaOrden.save();
        res.json(nuevaOrden);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear la orden');
    }
};

// 2. Ver mis órdenes (Historial del Cliente)
exports.obtenerOrdenesUsuario = async (req, res) => {
    try {
        // Buscamos por el ID del usuario y ordenamos por fecha (la más nueva primero)
        const ordenes = await Orden.find({ usuario: req.params.userId })
            .populate('productos.productoId')
            .sort({ fecha: -1 });
        res.json(ordenes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener órdenes');
    }
};

// 3. Ver TODAS (Para el Admin)
exports.obtenerTodas = async (req, res) => {
    try {
        const ordenes = await Orden.find()
            .populate('usuario', 'nombre email') 
            .populate('productos.productoId') 
            .sort({ fecha: -1 });
            
        res.json(ordenes);
    } catch (error) {
        console.log("Error en obtenerTodas:", error);
        res.status(500).send('Hubo un error obteniendo las órdenes');
    }
};

// 4. Actualizar Estado (Para el Admin)
exports.actualizarEstado = async (req, res) => {
    try {
        const { estado } = req.body;
        const orden = await Orden.findByIdAndUpdate(req.params.id, { estado }, { new: true });
        res.json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar');
    }
};