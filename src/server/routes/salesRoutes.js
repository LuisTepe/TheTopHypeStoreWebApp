const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController'); // Asegúrate de ajustar la ruta si es necesario

// Ruta para obtener los detalles de ventas
router.get('/detalles-ventas', ventasController.getDetallesVentas);

module.exports = router;
