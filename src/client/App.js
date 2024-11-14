import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from './homepage';
import Shop from './shop';
import ChatModal from './chatModal';
import About from './about';
import Contact from './contact';
import Product from './product'; // Importamos el archivo de la vista del producto
import AdminDashboard from './AdminDashboard'; // Importamos el AdminDashboard

const App = () => {
  return (
    <Router>
      <div className="container" style={{ margin: 0, padding: 0, height: '100vh', backgroundColor: '#000' }}>
        <Navbar className="navbar" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/producto/:id_producto" element={<Product />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* Agregamos la ruta del AdminDashboard */}
          </Routes>
        </div>
        <ChatModal />
      </div>
    </Router>
  );
};

export default App;
