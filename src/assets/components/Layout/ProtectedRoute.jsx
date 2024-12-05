import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingPage from './LoadingPage';  // Import the LoadingPage component

const ProtectedRoute = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true); // State for loading state
  const [isAuthenticated, setIsAuthenticated] = useState(null); // State to hold authentication status
  const token = localStorage.getItem('token'); // Check if there's a token in localStorage
  const location = useLocation(); // Get the current location for redirection after login

  useEffect(() => {
    // Simulate an authentication check or API call
    setTimeout(() => {
      if (!token) {
        setIsAuthenticated(false); // If no token, user is not authenticated
      } else {
        setIsAuthenticated(true); // If there's a token, user is authenticated
      }
      setIsLoading(false); // Once the check is done, stop loading
    }, 1000); // Adjust the delay for smoother UX
  }, [token]);

  if (isLoading) {
    return <LoadingPage />; // Show loading page while checking authentication
  }

  if (isAuthenticated === false) {
    localStorage.removeItem('token'); // Log the user out if not authenticated
    return <Navigate to="/login" state={{ from: location }} />; // Redirect to login
  }

  return element; // Render the protected element if the user is authenticated
};

export default ProtectedRoute;
