import React from 'react';

const HomePage = () => {
    return (
      <>
        <div className="navbar-placeholder" ></div>
        <div className="homepage-container" style={{ position: 'relative', width: '100vw', height: 'calc(100vh - 80px)', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="welcome-message" style={{ color: '#ffffff', fontSize: '6rem', fontFamily: 'Oswald', fontWeight: 700, zIndex: 20, textAlign: 'center', marginBottom: '20px' }}>
            BIENVENIDO A TOP HYPE STORE
          </div>
          <button className="shop-now-button" style={{ color: '#36fff1', background: 'transparent', border: '2px solid #36fff1', padding: '10px 20px', cursor: 'pointer', transition: 'all 0.3s', fontSize: '1.2rem', textTransform: 'uppercase' }}>
            COMPRAR AHORA
          </button>
          <img src="/images/background_photo.png" alt="Background Photo" className="background-photo" style={{ position: 'fixed', right: 0, top: 0, height: '200%', width: 'auto', objectFit: 'cover', zIndex: 1 }} />
        </div>
      </>
    );
};

export default HomePage;

