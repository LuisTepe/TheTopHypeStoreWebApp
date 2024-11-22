import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Modal from './modal';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ nombre_producto: '', descripcion: '', precio: '', stock: 0});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Obtener productos
  useEffect(() => {
    fetch('/api/productos')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  // Manejar creación de producto
  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('nombre_producto', newProduct.nombre_producto);
    formData.append('descripcion', newProduct.descripcion);
    formData.append('precio', newProduct.precio);
    formData.append('stock', newProduct.stock);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }
  
    fetch('/api/productos', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((product) => {
        setProducts([...products, product]);
        setNewProduct({ nombre_producto: '', descripcion: '', precio: '', stock: 0, image: null });
        setIsCreateModalOpen(false);
      })
      .catch((error) => console.error('Error al crear el producto:', error));
  };
  

  // Confirmar eliminación del producto
  const confirmDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Manejar eliminación de producto
  const handleDeleteProduct = () => {
    fetch(`/api/productos/${productToDelete.id_producto}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter((product) => product.id_producto !== productToDelete.id_producto));
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append('nombre_producto', editingProduct.nombre_producto);
    formData.append('precio', editingProduct.precio);
    formData.append('stock', editingProduct.stock);
    if (editingProduct.image) {
      formData.append('image', editingProduct.image);
    }

    fetch(`/api/productos/${editingProduct.id_producto}`, {
      method: 'PUT',
      body: formData,
    })
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id_producto === editingProduct.id_producto ? editingProduct : product
          )
        );
        setEditingProduct(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  // Abrir el modal para editar un producto
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div
        className="admin-table-container"
        style={{
          width: '90vw',
          paddingTop: '20px',
          padding: '70px',
          paddingLeft: '100px',
        }}
      >
        <h2 style={{ color: '#ffffff', display: 'inline-block' }}>Gestión de Productos</h2>
        <button onClick={() => setIsCreateModalOpen(true)} className="generic-crud-button">
          Crear Producto
        </button>

        {/* Tabla de productos */}
        <table className="table" style={{ width: '100%', color: '#ffffff' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th style={{ width: '150px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_producto}>
                <td>{product.id_producto}</td>
                <td>{product.nombre_producto}</td>
                <td>${product.precio}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openEditModal(product)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => confirmDeleteProduct(product)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear producto */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Producto"
      >
        <div>
          <label>
            Nombre:
            <input
              type="text"
              className="modal-input"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Precio:
            <input
              type="number"
              className="modal-input"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </label>
          <br />
          <label>
            Stock:
            <input
              type="number"
              className="modal-input"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            />
          </label>
          <br />
          <label>
            Imagen:
            <input
              type="file"
              className="modal-input"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
          </label>
          <br />
          <button className="generic-button" onClick={handleCreateProduct}>
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal para editar producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Producto"
      >
        {editingProduct && (
          <div>
            <label>
              Nombre:
              <input
                type="text"
                className="modal-input"
                value={editingProduct.nombre_producto}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    nombre_producto: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              Precio:
              <input
                type="number"
                className="modal-input"
                value={editingProduct.precio}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    precio: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <br />
            <label>
              Stock:
              <input
                type="number"
                className="modal-input"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <br />
            <button className="generic-button" onClick={handleUpdateProduct}>
              Guardar
            </button>
          </div>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <p>¿Estás seguro que deseas eliminar el producto {productToDelete?.nombre_producto}?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="generic-button" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </button>
          <button className="generic-button" onClick={handleDeleteProduct}>
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsTable;
