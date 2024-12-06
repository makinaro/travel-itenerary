import React, { useState, useEffect } from "react";
import styles from "./CreateEvent.module.css";

const fetchUsernames = (searchTerm) => {
  const allUsers = ["Xavier_Paul", "AaronsNipples", "tiuditto"];
  return allUsers.filter(username => username.toLowerCase().includes(searchTerm.toLowerCase()));
};

const fetchUserIdByUsername = async (username) => {
  try {
    const response = await fetch(`http://localhost:3000/users/username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`User not found: ${username}`);
    }

    const userData = await response.json();
    return userData.id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

const CreateEvent = ({ isOpen, onClose, onConfirm }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.searchBar}`)) {
        setSuggestedUsers([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search === "") {
      setSuggestedUsers([]);
    } else {
      const filteredUsers = fetchUsernames(search).filter((user) => !collaborators.includes(user));
      setSuggestedUsers(filteredUsers);
    }
  };

  const handleAddCollaborator = (collab) => {
    if (!collaborators.includes(collab)) {
      setCollaborators([...collaborators, collab]);
    }
    setSearchTerm("");
  };

  const handleRemoveCollaborator = (index) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const handleConfirm = async () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!startTime) errors.startTime = "Start Time is required";
    if (!endTime) errors.endTime = "End Time is required";
    if (new Date(`1970-01-01T${endTime}`) < new Date(`1970-01-01T${startTime}`)) {
      errors.time = "End Time cannot be before Start Time";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const collaboratorIds = await Promise.all(
      collaborators.map(async (collab) => {
        const userId = await fetchUserIdByUsername(collab);
        return userId;
      })
    );

    const eventData = {
      title,
      startTime,
      endTime,
      collaborators: collaboratorIds,
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`Error creating event: ${response.statusText}`);
      }

      const responseData = await response.json();
      onConfirm(responseData);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.CreateYourTrip}>Create Your Event</h2>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
          />
          {formErrors.title && <p className={styles.errorText}>{formErrors.title}</p>}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.dateContainer}>
            <div className={styles.dateGroup}>
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              {formErrors.startTime && <p className={styles.errorText}>{formErrors.startTime}</p>}
            </div>
            <div className={styles.dateGroup}>
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              {formErrors.endTime && <p className={styles.errorText}>{formErrors.endTime}</p>}
              {formErrors.time && <p className={styles.errorText}>{formErrors.time}</p>}
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
