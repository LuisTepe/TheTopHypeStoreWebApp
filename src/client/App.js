import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from './homepage';
import Shop from './shop';
import ChatModal from './chatModal'; // Mantén el import del ChatModal

const App = () => {
  return (
    <Router>
      <div className="container" style={{ margin: 0, padding: 0, height: '100vh', backgroundColor: '#000' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <ChatModal /> {/* Mostrar el ChatModal siempre sin necesidad de un botón */}
      </div>
    </Router>
  );
};

export default App;
