const Producto = require('../models/Producto');
//crear producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);

        await producto.save();
        res.json(producto);
        
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error al guardar el producto');
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
//actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, marca, descripcion, categoria, precio, stock } = req.body;
        
        // 1. Revisar si el ID es válido (opcional pero recomendado) y si existe el producto
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        // 2. Crear el objeto con la nueva información
        const nuevoProducto = {};
        if (nombre) nuevoProducto.nombre = nombre;
        if (marca) nuevoProducto.marca = marca;
        if (descripcion) nuevoProducto.descripcion = descripcion;
        if (categoria) nuevoProducto.categoria = categoria;
        if (precio) nuevoProducto.precio = precio;
        if (stock) nuevoProducto.stock = stock;

        // 3. Actualizar en la BD
        // { new: true } nos devuelve el producto YA actualizado en la respuesta
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