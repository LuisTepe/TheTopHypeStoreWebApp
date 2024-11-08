import React from 'react';
import './App.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Top Hype Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="search-cart-container">
          <div className="search-box">
            <button className="btn-search">
              <span className="material-icons">search</span>
            </button>
            <input type="text" className="input-search" placeholder="Search..." />
          </div>
          <span className="material-icons shopping-cart">shopping_cart</span>
        </div>
      </nav>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <div className="navbar-placeholder" style={{ height: '80px' }}></div>
      <div className="homepage-container" style={{ position: 'relative', width: '100vw', height: 'calc(100vh - 80px)', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="welcome-message" style={{ color: '#ffffff', fontSize: '5rem', fontFamily: 'Oswald', fontWeight: 700, zIndex: 20, textAlign: 'center' }}>
          BIENVENIDO A TOP HYPE STORE
        </div>
        <img src="/images/background_photo.png" alt="Background Photo" className="background-photo" style={{ position: 'fixed', right: 0, top: 0, height: '100vh', objectFit: 'cover', zIndex: 1 }} />
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="container" style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <HomePage />
    </div>
  );
};

export default App;
