const db = require('../models'); // Importa todos los modelos de la carpeta `models`
const Ventas = db.ventas; // Asigna específicamente el modelo `ventas`

// Obtener estadísticas totales de ventas y pedidos
exports.getTotalStats = async (req, res) => {
  try {
    const totalSales = await Ventas.sum('total');
    const totalOrders = await Ventas.count();

    res.status(200).json({
      totalSales,
      totalOrders,
    });
  } catch (error) {
    console.error('Error al obtener estadísticas totales:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas totales' });
  }
};

// Obtener ventas por mes
exports.getMonthlySales = async (req, res) => {
  const { month } = req.query;

  try {
    const monthlySales = await Ventas.sum('total', {
      where: db.Sequelize.where(
        db.Sequelize.fn('MONTH', db.Sequelize.col('fecha_venta')),
        month
      ),
    });

    res.status(200).json({
      monthlySales,
    });
  } catch (error) {
    console.error('Error al obtener ventas mensuales:', error);
    res.status(500).json({ message: 'Error al obtener ventas mensuales' });
  }
};
