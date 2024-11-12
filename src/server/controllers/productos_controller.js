// src/server/controllers/productos_controller.js
const { productos } = require('../models');  // Asegúrate de que la importación del modelo sea correcta

// Definimos la función obtenerProductos para manejar la solicitud GET
const obtenerProductos = async (req, res) => {
    try {
      const listaProductos = await productos.findAll();
      console.log('Productos obtenidos:', listaProductos);
      res.json(listaProductos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  };
  
  
  // Exportar la función para que pueda ser utilizada en las rutas
  module.exports = {
    obtenerProductos,
  };