import React, { useState } from "react";
import "./Settings1.css";

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

  const handleCancel = () => {
    alert("Changes canceled.");
  };

  return (
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
          <span className="icon lock-icon">🔒</span>
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
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;
