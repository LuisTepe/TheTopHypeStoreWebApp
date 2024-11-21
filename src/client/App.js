import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from './homepage';
import Shop from './shop';
import ChatModal from './chatModal';
import About from './about';
import Contact from './contact';
import Product from './product';
import CartModal from './cartModal';
import SearchResults from './SearchResults'; // Importamos la vista de resultados de búsqueda

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
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
        <ChatModal />
        <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
      </div>
    </Router>
  );
};

export default App;
