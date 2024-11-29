import React from "react";
import { Link } from 'react-router-dom';
import "./Home1.css";
import backgroundImage from '../assets/Images/backgroundhome.jpeg';
import globeImage from '../assets/Images/global.png';
import logoImage from '../assets/Images/logo.png';

const App = () => {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-icon" />
          GRAND LINE
        </div>
        <div className="nav-buttons">
          <Link to="/register">
            <button className="nav-btn outlined">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="nav-btn filled">Log In</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Got travel plans?<br />
            Pin your<br />
            destinations and<br />
            explore the<br />
            world!
          </h1>
          <Link to="/register">
            <button className="sign-up-btn">Sign Up</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={globeImage} alt="Travel Globe" />
        </div>
      </header>
    </div>
  );
};

export default App;
