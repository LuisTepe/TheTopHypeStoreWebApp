import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  console.log("Renderizando Navbar...");
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Top Hype Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
        <div className="search-cart-container">
          <div className="search-box">
            <button className="btn-search">
              <span className="material-icons">search</span>
            </button>
            <input type="text" className="input-search" placeholder="Search..." />
          </div>
          <span className="material-icons shopping-cart">shopping_cart</span>
          <span className="material-symbols-outlined account-icon">account_circle</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
