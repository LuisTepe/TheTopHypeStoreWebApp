// src/server/app.js
const express = require('express');
const db = require('./models'); // Importamos el archivo index.js

const app = express();

// Conexión a la base de datos
db.sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((error) => console.error('Error de conexión:', error));

// Ruta para obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await db.obtenerProductos(); // Usamos la función obtenerProductos del archivo index.js
    res.json(productos);
  } catch (error) {
    res.status(500).json({ smessage: 'Error al obtener los productos', error: error.message });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
