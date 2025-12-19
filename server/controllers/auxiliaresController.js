const Marca = require('../models/Marca');
const Categoria = require('../models/Categoria');

// --- MARCAS ---
exports.crearMarca = async (req, res) => {
    try {
        const nuevaMarca = new Marca(req.body);
        await nuevaMarca.save();
        res.json(nuevaMarca);
    } catch (error) {
        res.status(500).send('Error al crear marca');
    }
}

exports.obtenerMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        res.status(500).send('Error al obtener marcas');
    }
}

// --- CATEGORIAS ---
exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).send('Error al crear categoria');
    }
}

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).send('Error al obtener categorias');
    }
}