// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Registro de usuario
router.post('/register', userController.register);

// Inicio de sesión
router.post('/login', authController.login);

// Ruta protegida de ejemplo
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Bienvenido, usuario con email: ${req.user.email}` });
});

module.exports = router;