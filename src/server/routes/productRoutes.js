// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); // Importa el controlador

// Define la ruta para obtener todos los productos
router.get('/api/productos', productsController.getAllProducts);

module.exports = router;
