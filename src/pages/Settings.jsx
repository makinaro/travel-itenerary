import React, { useState } from "react";
import "./Settings1.css";

function ProfileSettings() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("asdadadsadd@gmail.com");
  const [username, setUsername] = useState("dittousername123");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!username || !email) {
      setErrorMessage("Username and email are required.");
      return;
    }
    setErrorMessage("");
  };

  const handleSavePassword = (e) => {
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
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
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
