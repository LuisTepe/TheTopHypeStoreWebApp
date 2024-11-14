// src/components/ProductsDataTable.js
import React from 'react';

const ProductsDataTable = () => (
  <table style={styles.table}>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Producto 1</td>
        <td>$20</td>
        <td>5</td>
        <td><button style={styles.button}>Editar</button></td>
      </tr>
      <tr>
        <td>Producto 2</td>
        <td>$30</td>
        <td>3</td>
        <td><button style={styles.button}>Editar</button></td>
      </tr>
    </tbody>
  </table>
);

const styles = {
  table: {
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    borderCollapse: 'collapse'
  },
  button: {
    backgroundColor: '#00FFFF',
    color: '#1a1a1a',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  }
};

export default ProductsDataTable;
