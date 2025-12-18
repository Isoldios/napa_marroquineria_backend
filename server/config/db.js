// server/config/db.js
const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Estas opciones ya no son obligatorias en versiones nuevas de Mongoose (6+),
            // pero si usas una versión anterior, descoméntalas:
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Base de Datos Conectada Exitosamente');
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app si hay error en la conexión
    }
} 
module.exports = conectarDB;