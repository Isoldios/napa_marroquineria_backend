// server/prueba_conexion.js
require('dotenv').config();
const mongoose = require('mongoose');

const probar = async () => {
    console.log("1. Intentando conectar a:", process.env.MONGO_URI);
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("2. ¡CONEXIÓN EXITOSA! ✅ La clave y la IP están bien.");
        
        // Prueba de inserción directa (sin rutas)
        const db = mongoose.connection.db;
        await db.collection('test_insert').insertOne({ prueba: true });
        console.log("3. Inserción de prueba exitosa.");
        
    } catch (error) {
        console.log("---------------------------------------------------");
        console.log("❌ ERROR DE CONEXIÓN DETECTADO:");
        console.error(error.message); // Solo el mensaje importante
        console.log("---------------------------------------------------");
        
        if (error.message.includes('bad auth')) {
            console.log("👉 PISTA: Tu usuario o contraseña en .env son incorrectos.");
        } else if (error.message.includes('whitelist') || error.message.includes('queryTxt')) {
            console.log("👉 PISTA: Tu IP no está permitida en MongoDB Atlas o el link está mal copiado.");
        }
    } finally {
        await mongoose.disconnect();
    }
};

probar();