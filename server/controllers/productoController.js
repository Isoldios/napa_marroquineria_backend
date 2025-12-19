const Producto = require('../models/Producto');

// Función auxiliar para calcular stock total
const calcularStockTotal = (tieneColores, stockSimple, listaColores) => {
    if (tieneColores && Array.isArray(listaColores)) {
        // Sumamos las cantidades del array
        return listaColores.reduce((total, item) => total + Number(item.cantidad), 0);
    }
    return stockSimple; // Si no tiene colores, devolvemos el stock manual
};

exports.crearProducto = async (req, res) => {
    try {
        let datos = req.body;

        // Calculamos el stock real antes de guardar
        datos.stock = calcularStockTotal(datos.tieneColores, datos.stock, datos.stockPorColor);

        const producto = new Producto(datos);
        await producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtener productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, marca, descripcion, categoria, precio, stock, imagen, tieneColores, stockPorColor } = req.body;
        
        let producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'No existe el producto' });

        const nuevoProducto = {};
        
        // Campos básicos
        if (nombre) nuevoProducto.nombre = nombre;
        if (marca) nuevoProducto.marca = marca;
        if (descripcion) nuevoProducto.descripcion = descripcion;
        if (categoria) nuevoProducto.categoria = categoria;
        if (precio) nuevoProducto.precio = precio;
        if (imagen) nuevoProducto.imagen = imagen;

        // LÓGICA DE STOCK Y COLORES
        // Actualizamos los flags y arrays
        // Nota: aceptamos 'false' explícito, por eso comprobamos undefined
        if (tieneColores !== undefined) nuevoProducto.tieneColores = tieneColores;
        if (stockPorColor) nuevoProducto.stockPorColor = stockPorColor;

        // Recalculamos el Stock Total Numérico
        // Usamos los valores nuevos si existen, sino los viejos del producto en BD
        const usarTieneColores = (tieneColores !== undefined) ? tieneColores : producto.tieneColores;
        const usarStockSimple = (stock !== undefined) ? stock : producto.stock;
        const usarStockColor = (stockPorColor !== undefined) ? stockPorColor : producto.stockPorColor;

        nuevoProducto.stock = calcularStockTotal(usarTieneColores, usarStockSimple, usarStockColor);

        producto = await Producto.findByIdAndUpdate(
            { _id: req.params.id }, 
            nuevoProducto, 
            { new: true }
        );

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar');
    }
}

//eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        // 1. Buscar si existe
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        // 2. Eliminar
        await Producto.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Producto eliminado con éxito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar');
    }
}
