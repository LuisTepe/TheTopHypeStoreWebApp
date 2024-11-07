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
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <h1>Welcome to Top Hype Hats!</h1>
      <p>Explore the trendiest collection of hats available online.</p>
    </div>
  );
};

export default App;
