// src/server/app.js

// Importamos las dependencias necesarias
const express = require('express'); // Framework web para Node.js
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes
const db = require('./models'); // Importamos todos los modelos desde index.js
const dashboardRoutes = require('./routes/dashboardRoutes'); // Rutas del dashboard
const multer = require('multer'); // Middleware para manejo de archivos
const path = require('path'); // Módulo para trabajar con rutas de archivos

// Importamos Sequelize y operadores
const { Sequelize, DataTypes, Op } = require('sequelize'); // 'Op' se usa para operaciones avanzadas en consultas

// Creamos una instancia de Express
const app = express();

// Importamos bcrypt y jsonwebtoken para manejo de autenticación y seguridad
const bcrypt = require('bcrypt'); // Librería para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Librería para crear y verificar tokens JWT
const SECRET_KEY = 'tu_clave_secreta_segura'; // Definimos la clave secreta para JWT (debe almacenarse de forma segura)

// Configuración de Multer para manejo de archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/caps/'); // Directorio donde se guardarán las imágenes subidas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único a cada archivo usando la fecha actual y su extensión original
  },
});

const upload = multer({ storage }); // Inicializamos Multer con la configuración de almacenamiento

// Configuración de body-parser para analizar solicitudes entrantes en formato JSON
app.use(bodyParser.json());

// Conexión a la base de datos usando Sequelize
db.sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((error) => console.error('Error de conexión:', error));

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static('uploads'));  

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await db.Producto.findAll(); // Obtenemos todos los productos de la base de datos
    res.json(productos); // Enviamos los productos en formato JSON
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
});

// Ruta para buscar productos específicos por nombre
app.get('/api/productos/buscar', async (req, res) => {
  const search = req.query.search; // Obtenemos el término de búsqueda de la consulta

  try {
    const productos = await db.Producto.findAll({
      where: {
        nombre_producto: {
          [Op.like]: `%${search}%` // Buscamos productos cuyo nombre contenga el término de búsqueda
        }
      }
    });

    res.json(productos); // Enviamos los productos encontrados
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
});

// Ruta para obtener un producto por su ID
app.get('/api/productos/:id_producto', async (req, res) => {
  const { id_producto } = req.params; // Extraemos el ID del producto de los parámetros de ruta
  try {
    const producto = await db.Producto.findByPk(id_producto); // Buscamos el producto por su clave primaria
    if (producto) {
      res.json(producto); // Si se encuentra, lo enviamos en formato JSON
    } else {
      res.status(404).send('Producto no encontrado'); // Si no se encuentra, enviamos un error 404
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Error al obtener el producto');
  }
});

// Ruta para obtener las tallas asociadas a un producto por su ID
app.get('/api/productos/:id_producto/tallas', async (req, res) => {
  const { id_producto } = req.params; // Obtenemos el ID del producto
  try {
    const tallasProductos = await db.TallasProductos.findAll({
      where: { id_producto } // Buscamos en la tabla intermedia las tallas relacionadas
    });

    if (tallasProductos.length === 0) {
      return res.status(404).send('No se encontraron tallas para este producto');
    }

    const idTallas = tallasProductos.map(tp => tp.id_talla); // Extraemos los IDs de las tallas

    const tallas = await db.Tallas.findAll({
      where: {
        id_talla: idTallas // Buscamos las tallas utilizando los IDs obtenidos
      }
    });

    if (tallas.length > 0) {
      res.json(tallas); // Enviamos las tallas encontradas
    } else {
      res.status(404).send('No se encontraron tallas para los IDs obtenidos');
    }
  } catch (error) {
    console.error('Error al obtener las tallas:', error);
    res.status(500).send('Error al obtener las tallas');
  }
});

// Ruta para crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre_producto, descripcion, precio, stock } = req.body; // Obtenemos los datos del cuerpo de la solicitud

    // Validación básica de datos
    if (!nombre_producto || !precio || isNaN(stock)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Creamos el nuevo producto en la base de datos
    const nuevoProducto = await db.Producto.create({
      nombre_producto,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    });

    console.log('Producto creado:', nuevoProducto);
    res.json(nuevoProducto); // Enviamos el producto creado
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

// Ruta para actualizar un producto existente
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID del producto a actualizar
    const { nombre_producto, descripcion, precio, stock } = req.body; // Obtenemos los nuevos datos

    // Validación básica de datos
    if (!nombre_producto || !precio || isNaN(stock)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Actualizamos el producto en la base de datos
    const productoActualizado = await db.Producto.update(
      {
        nombre_producto,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      },
      { where: { id_producto: id } }
    );

    if (productoActualizado[0] > 0) {
      console.log(`Producto con ID ${id} actualizado`);
      res.json({ success: true }); // Confirmamos que la actualización fue exitosa
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); // Si no se encontró el producto, enviamos un error 404
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID del producto a eliminar
    const deleted = await db.Producto.destroy({ where: { id_producto: id } }); // Eliminamos el producto

    if (deleted) {
      console.log(`Producto con ID ${id} eliminado`);
      res.json({ success: true }); // Confirmamos que la eliminación fue exitosa
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); // Si no se encontró el producto, enviamos un error 404
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

// Importar rutas adicionales
const tallasRoutes = require('./routes/tallasRoutes'); // Rutas relacionadas con tallas

// Usar las rutas importadas en la aplicación
app.use(tallasRoutes);

// Importar rutas de usuarios
const usuariosRoutes = require('./routes/usuariosRoutes'); // Rutas relacionadas con usuarios

// Usar rutas de usuarios
app.use(usuariosRoutes);

/* RUTAS PARA USUARIOS */

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; // Obtenemos el email y la contraseña del cuerpo de la solicitud

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' }); // Validación básica
  }

  try {
    // Buscar al usuario por su email en la base de datos
    const user = await db.usuarios.findOne({
      where: { email },
      // No es necesario especificar 'attributes' ya que 'password' está incluido
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' }); // Si no se encuentra el usuario, enviamos un error
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' }); // Si las contraseñas no coinciden, enviamos un error
    }

    // Generar el token JWT incluyendo información del usuario
    const token = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email, nombre: user.nombre },
      SECRET_KEY,
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token }); // Enviamos el token al cliente
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { nombre, email, password } = req.body; // Obtenemos los datos del cuerpo de la solicitud

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' }); // Validación básica
  }

  try {
    const existingUser = await db.usuarios.findOne({ where: { email } }); // Verificamos si el email ya está registrado
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' }); // Si el email existe, enviamos un error
    }

    // No hasheamos la contraseña aquí; el modelo se encargará de eso (suponiendo que hay un hook en el modelo)
    const newUser = await db.usuarios.create({
      nombre,
      email,
      password, // Guardamos la contraseña; debe ser hasheada en el modelo
      roletype_id: 2, // Establecer el rol predeterminado como 2 (por ejemplo, usuario estándar)
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser }); // Enviamos el usuario creado
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Middleware de autenticación con JWT para proteger rutas
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; // Obtenemos el encabezado de autorización

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extraemos el token del encabezado
    jwt.verify(token, SECRET_KEY, (err, user) => { // Verificamos el token
      if (err) {
        return res.status(403).json({ message: 'Token no válido' }); // Si el token no es válido, enviamos un error
      }
      req.user = user; // Agregamos la información del usuario a la solicitud
      next(); // Continuamos al siguiente middleware o ruta
    });
  } else {
    res.status(401).json({ message: 'Autorización requerida' }); // Si no hay token, enviamos un error
  }
};

// Configurar rutas del dashboard (posiblemente protegidas)
app.use('/api/dashboard', dashboardRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
