import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const Product = () => {
  const { id_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [tallas, setTallas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details
    fetch(`/api/productos/${id_producto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el producto: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setProducto(data);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
        setError('No se pudo obtener la información del producto.');
      });

    // Fetch product sizes
    fetch(`/api/productos/${id_producto}/tallas`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las tallas: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setTallas(data);
      })
      .catch(error => {
        console.error('Error al obtener las tallas:', error);
        setError('No se pudo obtener la información de las tallas.');
      });
  }, [id_producto]);

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  }

  if (!producto) {
    return <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;
  }

  return (
    <div className="product-container" style={{ padding: '70px', backgroundColor: '#000', color: '#fff', fontFamily: 'Oswald', minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="product-content" style={{ maxWidth: '1400px', width: '85%', display: 'flex', gap: '40px', flexWrap: 'nowrap' }}>
        <div style={{ flex: '1' }}>
          <img
            src={`/images/caps/${producto.id_producto}.jpeg`}
            alt={producto.nombre_producto}
            style={{ width: '550px', height: '550px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h1 style={{ color: '#36fff1', fontSize: '2.5rem', marginBottom: '20px' }}>{producto.nombre_producto}</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'justify', marginBottom: '20px' }}>
            {producto.descripcion}
          </p>
          <p style={{ color: '#36fff1', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Precio: ${producto.precio}
          </p>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="tallas" style={{ fontSize: '1.2rem', marginRight: '10px', color: '#ffffff' }}>Tallas disponibles:</label>
            <select id="tallas" style={{ fontSize: '1rem', padding: '10px', backgroundColor: '#2c2f33', color: '#ffffff', border: 'none', borderRadius: '5px', outline: 'none' }}>
              {tallas.map((talla, index) => (
                <option key={index} value={talla.id_talla}>
                  {talla.talla}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button style={{ backgroundColor: '#36fff1', color: '#000', padding: '15px 30px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              AGREGAR AL CARRITO
            </button>
            <button style={{ backgroundColor: '#ffffff', color: '#000', padding: '15px 30px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              COMPRAR AHORA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
