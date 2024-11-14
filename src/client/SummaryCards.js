// src/components/SummaryCards.js
import React from 'react';

const SummaryCards = () => (
  <div style={styles.cards}>
    <div style={styles.card}>
      <h2>Usuarios</h2>
      <p>100</p>
    </div>
    <div style={styles.card}>
      <h2>Productos</h2>
      <p>250</p>
    </div>
    <div style={styles.card}>
      <h2>Ventas</h2>
      <p>$5000</p>
    </div>
  </div>
);

const styles = {
  cards: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '5px',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    border: '1px solid #00FFFF'
  }
};

export default SummaryCards;
