// src/server/index.js o app.js
const express = require('express');
const sequelize = require('./db');  // O require('./db') si usas Mongoose

const app = express();

// Sincroniza la base de datos si usas Sequelize
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((error) => console.error('Error de conexión:', error));

app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
