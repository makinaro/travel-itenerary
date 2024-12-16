import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings1.css";
import { getToken, getUserId } from "../services/auth";

function ProfileSettings() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("asdadadsadd@gmail.com");
  const [username, setUsername] = useState("dittousername123");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserId();
      const token = getToken();
      console.log(`Fetching data for user ID: ${userId}`);
      console.log(`Using token: ${token}`);
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('User data:', userData);
        setEmail(userData.email);
        setUsername(userData.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      setErrorMessage("Username and email are required.");
      return;
    }

    setErrorMessage("");

    const userId = getUserId();
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        throw new Error(errorData.message || 'Failed to update profile');
      }
      alert('Profile updated successfully!');
    } catch (error) {
      setErrorMessage("Username or email already exists." || error.message);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password must match.");
      return;
    }

    setErrorMessage("");

    const userId = getUserId();
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ password: currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        throw new Error(errorData.message || 'Failed to update password');
      }

      alert('Password updated successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const userId = getUserId();
      const token = getToken();

      fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || 'Failed to delete account');
            });
          }

          // Clear any authentication tokens or user data
          localStorage.removeItem('token');
          localStorage.removeItem('userId');

          alert('Account deleted successfully!');

          navigate('/login'); // Use the navigate function here
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <h1 className="main-heading">PROFILE INFORMATION</h1>
        <p className="subheading">
          Update your account's profile information and email address
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleSaveProfile} className="save-button">
            Save
          </button>
        </div>

        <h2 className="section-heading">Update Password</h2>
        <p className="subheading">
          Ensure your account is using a long, random password to stay secure.
        </p>

        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleSavePassword} className="save-button">
            Save
          </button>
        </div>

        <h2 className="section-heading">Delete Account</h2>
        <p className="delete-text">
          Once your account is deleted all of its resources and data will be
          permanently deleted.
        </p>
        <div className="button-group">
          <button
            onClick={handleDeleteAccount}
            className="delete-button"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
