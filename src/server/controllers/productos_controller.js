const { Producto } = require('../models/productos'); // Asegúrate de que el modelo esté correctamente definido

// Configuración para subir imágenes

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const listaProductos = await Producto.findAll();
    console.log('Productos obtenidos:', listaProductos);
    res.json(listaProductos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre_producto, precio, stock } = req.body;
    const nuevoProducto = await Producto.create({
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
};

// Editar un producto
const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, precio, stock } = req.body;

    const productoActualizado = await Producto.update(
      {
        nombre_producto,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: req.file ? req.file.path : undefined, // Actualiza imagen si hay una nueva
      },
      { where: { id_producto: id } }
    );

    console.log('Producto actualizado:', productoActualizado);
    res.json({ success: true });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params; // Asegúrate de que este parámetro esté correcto
    const deleted = await Producto.destroy({ where: { id_producto: id } });
    if (deleted) {
      console.log(`Producto con ID ${id} eliminado`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
