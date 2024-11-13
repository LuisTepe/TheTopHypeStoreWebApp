import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from './homepage';
import Shop from './shop';
import ChatModal from './chatModal';
import About from './about';
import Contact from './contact';

const App = () => {
  return (
    <Router>
      <div className="container" style={{ margin: 0, padding: 0, height: '100vh', backgroundColor: '#000' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatModal />
      </div>
    </Router>
  );
};

export default App;
