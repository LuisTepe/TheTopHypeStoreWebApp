const db = require('../models');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await db.usuarios.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Crear un usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, roletype_id } = req.body;

    const nuevoUsuario = await db.usuarios.create({
      nombre,
      email,
      password,
      roletype_id: roletype_id || null,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Editar un usuario
exports.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, roletype_id } = req.body;

    const usuarioActualizado = await db.usuarios.update(
      { nombre, email, password, roletype_id },
      { where: { id_usuario: id } }
    );

    if (usuarioActualizado[0] > 0) {
      res.json({ message: 'Usuario actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.usuarios.destroy({ where: { id_usuario: id } });

    if (deleted) {
      res.json({ message: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
