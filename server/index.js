const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db'); // NUEVO: Importar función

require('dotenv').config();

// Conectar a la base de datos
conectarDB(); // NUEVO: Ejecutar conexión

const app = express();

app.use(cors());
app.use(express.json());

// Importamos las rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/auxiliares', require('./routes/auxiliares'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/ordenes', require('./routes/ordenes'));

app.get('/', (req, res) => {
    res.send('¡Servidor del E-commerce funcionando y conectado!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});