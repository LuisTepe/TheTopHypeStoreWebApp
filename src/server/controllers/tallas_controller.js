const db = require('../models');

// Obtener todas las tallas
exports.obtenerTallas = async (req, res) => {
  try {
    const tallas = await db.Tallas.findAll();
    res.json(tallas);
  } catch (error) {
    console.error('Error al obtener las tallas:', error);
    res.status(500).json({ message: 'Error al obtener las tallas', error: error.message });
  }
};

// Crear una nueva talla
exports.crearTalla = async (req, res) => {
  try {
    const { talla } = req.body;
    const nuevaTalla = await db.Tallas.create({ talla });
    console.log('Talla creada:', nuevaTalla);
    res.json(nuevaTalla);
  } catch (error) {
    console.error('Error al crear la talla:', error);
    res.status(500).json({ message: 'Error al crear la talla', error: error.message });
  }
};

// Editar una talla existente
exports.editarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const { talla } = req.body;

    const tallaActualizada = await db.Tallas.update(
      { talla },
      { where: { id_talla: id } }
    );

    if (tallaActualizada[0] > 0) {
      console.log(`Talla con ID ${id} actualizada`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Talla no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la talla:', error);
    res.status(500).json({ message: 'Error al actualizar la talla', error: error.message });
  }
};

// Eliminar una talla
exports.eliminarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Tallas.destroy({ where: { id_talla: id } });

    if (deleted) {
      console.log(`Talla con ID ${id} eliminada`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Talla no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la talla:', error);
    res.status(500).json({ message: 'Error al eliminar la talla', error: error.message });
  }
};
