// products_server.js
const mysql = require('mysql');
const express = require('express');

const app = express();
const port = 3000;

// Configura la conexión con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'atepezano', // Asegúrate de cambiar por el usuario correcto
  password: 'atepezano1234', // Asegúrate de cambiar por la contraseña correcta
  database: 'hype_store'
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para obtener los productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      res.status(500).send('Error al obtener los productos');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
