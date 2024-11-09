// src/server/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_bd', 'usuario', 'contraseña', {
  host: 'localhost',  // O la URL de tu base de datos
  dialect: 'mysql',   // Cambia a 'postgres' si usas PostgreSQL
});

module.exports = sequelize;
