import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import Gallery from './Gallery.jsx';
import Booking from './Booking.jsx';
import Admin from './Admin.jsx';
import './styles/admin.css'
import './styles/booking.css';
import './styles/gallery.css';
import './styles/global.css';
import './styles/main.css';
import './styles/navbar.css';

function App() {
  const [currentView, setView] = useState('home');

  // Set initial view based on URL
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin') {
      setView('admin');
    } else if (path === '/gallery') {
      setView('gallery');
    } else if (path === '/booking') {
      setView('booking');
    } else if (path === '/about') {
      setView('about');
    } else {
      setView('home');
    }
  }, []); // run once on mount

  // Conditionally render based on state 
  return (
    <div className="wrapper">
      <NavBar setView={setView} currentView={currentView} />
      {currentView === 'home' && <Main />}
      {currentView === 'gallery' && <Gallery />}
      {currentView === 'booking' && <Booking />}
      {currentView === 'about' && (
        <main>
          <h1>About</h1>
          <p>About us coming soon.</p>
        </main>
      )}
      {currentView === 'admin' && <Admin />}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
