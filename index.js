const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Traemos las variables de entorno
require('dotenv').config();

// Servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())



// Directorio publico
app.use( express.static('public')); //La carpeta pública

// Lectura del body
app.use( express.json());

// RUTAS
// Autenticación de usuario
app.use('/api/auth', require('./routes/auth'));
// CRUD de eventos
app.use('/api/events', require('./routes/events'));




// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
})