import React, { useState } from 'react';
import './Login.css';
import logoImage from '../assets/Images/logo.png'; // Ensure the path is correct
import loginBG from '../assets/Images/loginBG.gif';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react'; // Import Lucide icons
import { setToken, setUserId } from '../services/auth.js'; // Import the utility function

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      setToken(null);
      setUserId(null);
      const data = await response.json();

      // Store token using the utility function
      setToken(data.token);
      setUserId(data.user_id);
      setError(''); // Clear any previous errors

      // Redirect to /dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set the error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility state
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
          <h2 className="welcome-text">Good to see you again!</h2>
          <div className="login-box">
            <h2 className="login-title">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-with-icon">
                  <User className="input-icon" /> {/* User icon from lucide-react */}
                  <input
                    id="username"
                    name="identifier"
                    type="text"
                    required
                    className="form-input"
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>


              <button type="submit" className="submit-button">
                Login
              </button>
              {error && <p className="error-message">{error}</p>}
              <div className="form-footer">
                <Link to="/register" className="form-link">
                  Don't have an account?
                </Link>
                <Link to="/forgot-password" className="form-link">
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
