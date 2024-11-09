import React, { useEffect, useState } from 'react';
import './App.css';

const Shop = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="shop-container">
      <h2 className="shop-title">Catálogo de Productos</h2>
      <div className="products-grid">
        {productos.map(producto => (
          <div key={producto.id_producto} className="product-card">
            {/* Construye la ruta de la imagen dinámicamente */}
            <img 
              src={`/images/caps/${producto.id_producto}.jpeg`} 
              alt={producto.nombre} 
              className="product-image" 
              onError={(e) => e.target.src = '/images/default-product.png'} // Usa imagen por defecto si no encuentra la imagen correspondiente
            />
            <h3 className="product-name">{producto.nombre}</h3>
            <p className="product-price">${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
