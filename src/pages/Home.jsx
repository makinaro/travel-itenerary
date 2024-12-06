import React from "react";
import { Link } from "react-router-dom";
import "./Home1.css";
import logoImage from "../assets/Images/logo.png";
import personalizedImage from "../assets/Images/personalized.gif";
import trackImage from "../assets/Images/track.gif";
import connectImage from "../assets/Images/connect.gif";
import aboutImage from "../assets/Images/about.gif";
import DittoImage from '../assets/Images/Ditto.jpg';
import AaronImage from '../assets/Images/Aaron.jpg';
import XavierImage from '../assets/Images/Xavier.jpg';
import AntonioImage from '../assets/Images/Antonio.jpg';
import JamesImage from '../assets/Images/James.jpg';

const App = () => {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-icon" />
          <span className="logo-text">GRAND LINE</span>
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
          <h1 className="hero-title">Got Travel plans?</h1>
          <p className="hero-description">
            Pin your destinations and start your adventure today!
          </p>
          <Link to="/register">
            <button className="hero-btn">Get Started</button>
          </Link>
        </div>
      </header>

      {/* Feature Section */}
      <section className="features">
        <div className="feature">
          <h3 className="feature-title">Personalized Destinations</h3>
          <p className="feature-description">
            Discover destinations based on your preferences and travel style.
          </p>
          <img
            src={personalizedImage}
            alt="Personalized Destinations"
            className="feature-image"
          />
        </div>
        <div className="feature">
          <h3 className="feature-title">Track Your Journey</h3>
          <p className="feature-description">
            Easily track your travels and plan your next adventure with ease.
          </p>
          <img
            src={trackImage}
            alt="Track Your Journey"
            className="feature-image"
          />
        </div>
        <div className="feature">
          <h3 className="feature-title">Connect with Travelers</h3>
          <p className="feature-description">
            Join a community of travel enthusiasts and share your experiences.
          </p>
          <img
            src={connectImage}
            alt="Connect with Travelers"
            className="feature-image"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="mission-text">
          <h3 className="mission-title">Our Mission</h3>
          <p className="mission-description">
            At GRAND LINE, our mission is to provide personalized travel
            experiences to adventure seekers around the world. We aim to connect
            travelers, help them track their journeys, and inspire them to explore
            new destinations. Whether you're looking for an unforgettable vacation
            or simply want to track your travel progress, we are here to help you
            every step of the way.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <div className="about-text">
          <h3 className="about-title">About Us</h3>
          <p className="about-description">
            GRAND LINE is dedicated to helping travelers plan their dream
            vacations with ease. We provide a platform where you can discover
            personalized travel destinations, track your journey, and connect with
            fellow explorers. Our goal is to inspire and empower you to embark on
            your next adventure and create unforgettable memories. We offer a
            seamless experience for discovering, tracking, and sharing travel
            moments.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </section>


       {/* FAQ Section */}
       <section className="more-about">
  <div className="more-about-text">
    <h3 className="more-about-title">Frequently Asked Questions (FAQs)</h3>

    <div className="faq-item">
      <h4>Is GRAND LINE free to create and use?</h4>
      <p>
        GRAND LINE is free to use for everyone! That's right you heard me, it is free to create an account and use! Our Purpose is to make travel planning much easier and convinient to map out travel plans for individuals and friends.
      </p>
    </div>

    <div className="faq-item">
      <h4>How do I create an account?</h4>
      <p>
        To create an account, just click the sign up button at the top right of the navbar. After clicking it, it will direct you to a sign up form in which you are required to fill in for you to be able to proceed on creating a new account.
      </p>
    </div>

    <div className="faq-item">
      <h4>Do I need a specific device to use this (GRAND LINE)?</h4>
      <p>
        You can log in on any platform or device that you have for GRAND LINE is available to use on computers to mobile device!
      </p>
    </div>

    <div className="faq-item">
      <h4>Can I share trip plans or travel plans to my friends?</h4>
      <p>
        You can share your plans to other friends who have an existing account! As one of GRAND LINE's features is having a collaboration feature in which you can plan together with your family and friends!
        </p>
      </div>

    </div>
  </section>

  {/* Additional Information Section */}
  <section className="additional-info">
  <div className="profile-grid">
    <div className="profile-card">
      <div className="profile-photo">
      </div>
      <h4 className="profile-name">ABOUT THE DEVELOPERS</h4>
      <p className="profile-description">Get to know the developers behind GRAND LINE!</p>
    </div>

    <div className="profile-card">
      <div className="profile-photo">
        <img src={DittoImage} alt="Developer Profile" />
      </div>
      <h4 className="profile-name">Ditto Tiu</h4>
      <p className="profile-description">Full Stack, Front-end & Back-end Developer</p>
    </div>

    <div className="profile-card">
      <div className="profile-photo">
        <img src={AaronImage} alt="Developer Profile" />
      </div>
      <h4 className="profile-name">Aaron James Makinano</h4>
      <p className="profile-description">Back-end Developer</p>
    </div>

    <div className="profile-card">
      <div className="profile-photo">
        <img src={XavierImage} alt="Developer Profile" />
      </div>
      <h4 className="profile-name">Xavier Paul Cabasan</h4>
      <p className="profile-description">Front-end Developer</p>
    </div>

    <div className="profile-card">
      <div className="profile-photo">
        <img src={AntonioImage} alt="Developer Profile" />
      </div>
      <h4 className="profile-name">Antonio Vicen</h4>
      <p className="profile-description">Back-end Developer</p>
    </div>

    <div className="profile-card">
      <div className="profile-photo">
        <img src={JamesImage} alt="Developer Profile" />
      </div>
      <h4 className="profile-name">James Garcia</h4>
      <p className="profile-description">Front-end Developer</p>
    </div>

    
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/home">@grandline2024</Link>
        </div>
      </footer>
    </div>
  );
};

export default App;
