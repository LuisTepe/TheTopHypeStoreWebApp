import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Modal from './modal';

const TallasTable = () => {
  const [tallas, setTallas] = useState([]);
  const [editingTalla, setEditingTalla] = useState(null);
  const [newTalla, setNewTalla] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Obtener tallas
  useEffect(() => {
    fetch('/api/tallas')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTallas(data))
      .catch((error) => console.error('Error al obtener las tallas:', error));
  }, []);
  

  // Manejar creación de talla
  const handleCreateTalla = () => {
    fetch('/api/tallas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ talla: newTalla }),
    })
      .then((response) => response.json())
      .then((talla) => {
        setTallas([...tallas, talla]);
        setNewTalla('');
        setIsCreateModalOpen(false);
      })
      .catch((error) => console.error('Error al crear la talla:', error));
  };

  // Manejar eliminación de talla
  const handleDeleteTalla = (id) => {
    fetch(`/api/tallas/${id}`, { method: 'DELETE' })
      .then(() => {
        setTallas(tallas.filter((talla) => talla.id_talla !== id));
      })
      .catch((error) => console.error('Error al eliminar la talla:', error));
  };

  // Manejar actualización de talla
  const handleUpdateTalla = () => {
    fetch(`/api/tallas/${editingTalla.id_talla}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ talla: editingTalla.talla }),
    })
      .then(() => {
        setTallas(
          tallas.map((talla) =>
            talla.id_talla === editingTalla.id_talla ? editingTalla : talla
          )
        );
        setEditingTalla(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error al actualizar la talla:', error));
  };

  // Abrir el modal para editar una talla
  const openEditModal = (talla) => {
    setEditingTalla(talla);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-table-container" style={{ width: '90vw', padding: '20px 70px' }}>
        <h2 style={{ color: '#ffffff', display: 'inline-block' }}>Gestión de Tallas</h2>
        <button onClick={() => setIsCreateModalOpen(true)} className="generic-crud-button">
          Crear Talla
        </button>

        {/* Tabla de tallas */}
        <table className="table" style={{ width: '100%', color: '#ffffff' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Talla</th>
              <th style={{ width: '150px', textAlign: 'center' }} >Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tallas.map((talla) => (
              <tr key={talla.id_talla}>
                <td>{talla.id_talla}</td>
                <td>{talla.talla}</td>
                <td>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openEditModal(talla)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => handleDeleteTalla(talla.id_talla)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear talla */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Talla"
      >
        <div>
          <label>
            Talla:
            <input
              type="text"
              className="modal-input"
              value={newTalla}
              onChange={(e) => setNewTalla(e.target.value)}
            />
          </label>
          <br />
          <button className="generic-button" onClick={handleCreateTalla}>
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal para editar talla */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Talla"
      >
        {editingTalla && (
          <div>
            <label>
              Talla:
              <input
                type="text"
                className="modal-input"
                value={editingTalla.talla}
                onChange={(e) =>
                  setEditingTalla({ ...editingTalla, talla: e.target.value })
                }
              />
            </label>
            <br />
            <button className="generic-button" onClick={handleUpdateTalla}>
              Guardar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TallasTable;
