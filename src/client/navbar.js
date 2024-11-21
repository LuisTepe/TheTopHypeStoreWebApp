import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartModal from './cartModal'; // Importamos el modal del carrito

const Navbar = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Top Hype Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
        <div className="search-cart-container">
          <div className="search-box">
            <button className="btn-search">
              <span className="material-icons">search</span>
            </button>
            <input type="text" className="input-search" placeholder="Search..." />
          </div>
          <span className="material-icons shopping-cart" onClick={toggleCartModal}>shopping_cart</span>
          <span className="material-symbols-outlined account-icon"><Link to="/register">account_circle</Link></span>
        </div>
      </nav>
      <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
    </div>
  );
};

export default Navbar;
