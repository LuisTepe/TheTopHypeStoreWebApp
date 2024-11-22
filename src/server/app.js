// src/server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // Importamos todos los modelos desde index.js
const dashboardRoutes = require('./routes/dashboardRoutes');

const { Sequelize, DataTypes, Op } = require('sequelize'); // Asegúrate de importar Op

const app = express();

// Importamos bcrypt y jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta_segura'; // Definmimos la clave secreta

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

// Ruta para buscar productos específicos
app.get('/api/productos/buscar', async (req, res) => {
  const search = req.query.search;

  try {
    const productos = await db.Producto.findAll({
      where: {
        nombre_producto: {
          [Op.like]: `%${search}%` // Asegúrate de que sea case insensitive si es necesario
        }
      }
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
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
    const tallasProductos = await db.TallasProductos.findAll({
      where: { id_producto }
    });

    if (tallasProductos.length === 0) {
      return res.status(404).send('No se encontraron tallas para este producto');
    }

    const idTallas = tallasProductos.map(tp => tp.id_talla);

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

// Crear un producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre_producto, precio, stock } = req.body;
    const nuevoProducto = await db.Producto.create({
      nombre_producto,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    });
    console.log('Producto creado:', nuevoProducto);
    res.json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

// Editar un producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, precio, stock } = req.body;

    const productoActualizado = await db.Producto.update(
      {
        nombre_producto,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: req.file ? req.file.path : undefined, // Solo actualiza imagen si hay una nueva
      },
      { where: { id_producto: id } }
    );

    if (productoActualizado[0] > 0) {
      console.log(`Producto con ID ${id} actualizado`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Producto.destroy({ where: { id_producto: id } });

    if (deleted) {
      console.log(`Producto con ID ${id} eliminado`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

// Importar rutas
const tallasRoutes = require('./routes/tallasRoutes');

// Usar rutas
app.use(tallasRoutes);

// Importar rutas de usuarios
const usuariosRoutes = require('./routes/usuariosRoutes');

// Usar rutas de usuarios
app.use(usuariosRoutes);

        /*RUTAS PARA USUARIOS*/

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' });
  }

  try {
    // Buscar al usuario por su email
    const user = await db.usuarios.findOne({
      where: { email },
      // No es necesario especificar 'attributes' ya que ahora 'password' está incluido
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Generar el token JWT incluyendo el nombre
    const token = jwt.sign(
    { id_usuario: user.id_usuario, email: user.email, nombre: user.nombre },
    SECRET_KEY,
    { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});


// Ruta para registrar usuario
app.post('/api/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' });
  }

  try {
    const existingUser = await db.usuarios.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // No hasheamos la contraseña aquí, el modelo se encargará de eso
    const newUser = await db.usuarios.create({
      nombre,
      email,
      password, // Usamos la contraseña directamente
      roletype_id: 2, // Establecer el rol predeterminado como 2
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});


// Middleware de autenticación con JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Autorización requerida' });
  }
};


// Configurar rutas
app.use('/api/dashboard', dashboardRoutes);


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
