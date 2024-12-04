import React, { useState } from 'react';
import './Register1.css';
import logoImage from '../assets/Images/logo.png';
import loginBG from '../assets/images/loginBG.jpeg';
import { Lock, User, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempt with:', formData);

    try {
      const response = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set the error message
    }
  };
  return (
    <>
      <div className="logo-container">
        <Link to="/home" className="logo">
          <img src={logoImage} alt="Logo" className="logo-icon" />
          GRAND LINE
        </Link>
      </div>

      <div
        className="login-container"
        style={{
          backgroundImage: `url(${loginBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="login-content">
          <div>
            <h2 className="welcome-text">Let's get you started</h2>
            <p className="welcome-subtitle" style={{ color: 'white', fontSize: '1rem', textAlign: 'center', marginTop: '0.5rem', textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
              Fill in the details below to continue
            </p>
          </div>
          <div className="login-box">
            <h2 className="login-title">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-with-icon">
                  <Mail size={20} color="#666666" className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-with-icon">
                  <User size={20} color="#666666" className="input-icon" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="form-input"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <Lock size={20} color="#666666" className="input-icon" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
              <div className="form-footer" style={{ textAlign: 'center' }}>
                <a href="/login" className="form-link">
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;