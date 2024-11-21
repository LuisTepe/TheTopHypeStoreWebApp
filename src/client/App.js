import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar'; // Importamos el archivo de la navbar
import HomePage from './homepage'; // Importamos el archivo de la vista de homepage
import Shop from './shop'; // Importamos el archivo de la vista de shop
import ChatModal from './chatModal';// Importamos la API de DialogFlow
import About from './about';// Importamos el archivo de la vista about
import Contact from './contact';// Importamos el archivo de la vista contacto
import Product from './product'; // Importamos el archivo de la vista del producto
import CartModal from './cartModal'; // Importamos el archivo del modal del carrito
import Login from './Login'; // Importamos el archivo de la vista de login
import Register from './Register'; // Importamos el archivo de la vista de registro

const App = () => {
  const [isCartModalOpen, setCartModalOpen] = React.useState(false);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  return (
    <Router>
      <div className="container" style={{ margin: 0, padding: 0, height: '100vh', backgroundColor: '#000' }}>
        <Navbar className="navbar" toggleCartModal={toggleCartModal} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/producto/:id_producto" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <ChatModal />
        <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
      </div>
    </Router>
  );
};

export default App;
