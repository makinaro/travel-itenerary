import React, { useState } from "react";
import "./Settings1.css";
import { Lock } from "lucide-react"; // Importing the Lock icon

function ProfileSettings() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("asdadadsadd@gmail.com");
  const [username, setUsername] = useState("dittousername123");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile settings saved!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted successfully.");
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <h1 className="main-heading">Profile Settings</h1>
        <p className="subheading">Edit your profile details</p>

        <div className="profile-section">
          <img
            src={file ? URL.createObjectURL(file) : "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
          <div className="upload-section">
            <input type="file" onChange={handleFileChange} />
            <p className="upload-text">
              Uploaded images will be resized and square cropped from the top. In most places, your image will be displayed in a circle, like the example. (180x180 - 2048x2048 pixels)
            </p>
          </div>
        </div>

        <h2 className="section-heading">About You</h2>
        <div className="input-group">
          <label>Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              readOnly
            />
            <Lock className="lock-icon" />
          </div>
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>

        <h2 className="section-heading">Change Password</h2>
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
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="button-group">
          <button type="submit" onClick={handleSave} className="save-button">
            Save
          </button>
        </div>

        <h2 className="section-heading">Delete Account</h2>
        <p className="delete-text">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
        </p>
        <div style={{ marginBottom: "1rem" }}></div>
        <div className="delete-button-group">
          <button type="button" onClick={handleDeleteAccount} className="delete-button" style={{ backgroundColor: "#FF0404", color: "white" }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
