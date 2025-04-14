/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const path = require('path');

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json())

// rutas
// TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// TODO: CRUD: Eventos

// Solución al problema de rutas (Express vs React)
// app.use(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });


app.get('/*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
  

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})