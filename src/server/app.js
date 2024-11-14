// src/server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // Importamos todos los modelos desde index.js

const app = express();

// Configuración de body-parser
app.use(bodyParser.json());

// Conexión a la base de datos
db.sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((error) => console.error('Error de conexión:', error));

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await db.Producto.findAll(); // Usamos db.Producto para acceder al modelo
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
});

// Ruta para obtener un producto por ID
app.get('/api/productos/:id_producto', async (req, res) => {
  const { id_producto } = req.params;
  try {
    const producto = await db.Producto.findByPk(id_producto); // Cambiado para usar `findByPk` directamente en el modelo Producto
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Error al obtener el producto');
  }
});

// Ruta para obtener las tallas de un producto por ID
app.get('/api/productos/:id_producto/tallas', async (req, res) => {
  const { id_producto } = req.params;
  try {
    // Primero obtenemos los registros de la tabla intermedia tallas_productos
    const tallasProductos = await db.TallasProductos.findAll({
      where: { id_producto }
    });

    if (tallasProductos.length === 0) {
      // Si no se encuentran registros
      return res.status(404).send('No se encontraron tallas para este producto');
    }

    // Obtener los id_tallas de los registros encontrados
    const idTallas = tallasProductos.map(tp => tp.id_talla);

    // Luego obtenemos las tallas correspondientes de la tabla tallas
    const tallas = await db.Tallas.findAll({
      where: {
        id_talla: idTallas
      }
    });

    if (tallas.length > 0) {
      res.json(tallas);
    } else {
      res.status(404).send('No se encontraron tallas para los IDs obtenidos');
    }
  } catch (error) {
    console.error('Error al obtener las tallas:', error);
    res.status(500).send('Error al obtener las tallas');
  }
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
