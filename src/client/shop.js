import React, { useEffect, useState } from 'react';
import './App.css';

const Shop = () => {
  const [productos, setProductos] = useState([]); // Asegúrate de que sea un array al inicio

  useEffect(() => {
    // Fetch products from the backend API
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setProductos([]);
        }
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="shop-container" style={{ width: '100vw', padding: '40px', boxSizing: 'border-box' }}>
      <h2 className="shop-title" style={{ color: '#ffffff', fontSize: '3rem', marginBottom: '40px' }}>CATÁLOGO DE PRODUCTOS</h2>
      <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
        {productos.map(producto => (
          <div key={producto.id_producto} className="product-card" style={{ width: '100%', height: 'auto', padding: '20px'}}>
            <img
              src={`/images/caps/${producto.id_producto}.jpeg`}
              alt={producto.nombre_producto}
              className="product-image"
              style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '15px' }}
            />
            <h3 className="product-name" style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '10px' }}>{producto.nombre_producto}</h3>
            <p className="product-price" style={{ color: '#36fff1', fontSize: '1.5rem', fontWeight: 'bold' }}>${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
