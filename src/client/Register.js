// src/components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [nombre, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert('Registro exitoso, por favor inicia sesión');
      } else {
        const errorData = await response.json();
        alert(`Error en el registro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Crear Cuenta</h2>

        <div className="form-group">
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Register;
