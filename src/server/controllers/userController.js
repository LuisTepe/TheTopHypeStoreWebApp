const bcrypt = require('bcryptjs');
const { usuarios: User, roles: Role } = require('../models'); // Cambiado para usar el modelo desde `db`

exports.register = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Añadir log para revisar los datos recibidos

    const { nombre, password, email, tipo_usuario = 'cliente', roletype_id = 1 } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Usuario ya existe:', email);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Verificar si el rol proporcionado existe (opcional si siempre asignas un rol por defecto)
    const existingRole = await Role.findOne({ where: { roletype_id } });
    if (!existingRole) {
      console.log('Rol no encontrado:', roletype_id);
      return res.status(400).json({ message: 'El rol proporcionado no existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña encriptada:', hashedPassword);

    // Crear usuario
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      tipo_usuario,
      roletype_id,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Esto debería dar más detalles sobre el error en la consola del backend
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};
