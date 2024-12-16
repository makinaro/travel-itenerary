import React, { useState, useEffect } from "react";
import styles from "./CreateEvent.module.css";
import { getToken } from "../../../services/auth";

const fetchUserIdByUsername = async (username) => {
  try {
    const response = await fetch(`http://localhost:3000/users/username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${getToken()}`, // Include the token in the Authorization header
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

const fetchSuggestedUsers = async (searchTerm) => {
  try {
    const response = await fetch(`http://localhost:3000/users/search/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${getToken()}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching suggested users: ${response.statusText}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching suggested users:", error);
    return [];
  }
};

const CreateEvent = ({ isOpen, onClose, onConfirm, tripStartDate, tripEndDate }) => {
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

  useEffect(() => {
    // Validate and format dates
    const formattedStart = tripStartDate ? 
      new Date(tripStartDate).toISOString().split('T')[0] : 
      null;
    const formattedEnd = tripEndDate ? 
      new Date(tripEndDate).toISOString().split('T')[0] : 
      null;
  }, [tripStartDate, tripEndDate]);

  const formatDateForInput = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    // Format to YYYY-MM-DDTHH:MM
    return formattedDate.toISOString().slice(0, 16);
  };

  const formattedTripStartDate = formatDateForInput(tripStartDate);
  const formattedTripEndDate = formatDateForInput(tripEndDate);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        const users = await fetchSuggestedUsers(searchTerm);
        setSuggestedUsers(users);
      } else {
        setSuggestedUsers([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleConfirm = async () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!startTime) errors.startTime = "Start Time is required";
    if (!endTime) errors.endTime = "End Time is required";
    if (new Date(`1970-01-01T${endTime}`) < new Date(`1970-01-01T${startTime}`)) {
      errors.time = "End Time cannot be before Start Time";
    }

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    const tripStart = new Date(tripStartDate);
    const tripEnd = new Date(tripEndDate);

    // Validate start time
    if (startDateTime < tripStart) {
      errors.startTime = `Start time cannot be before trip start (${tripStart.toLocaleString()})`;
    }
    if (startDateTime > tripEnd) {
      errors.startTime = `Start time cannot be after trip end (${tripEnd.toLocaleString()})`;
    }

    // Validate end time
    if (endDateTime < tripStart) {
      errors.endTime = `End time cannot be before trip start (${tripStart.toLocaleString()})`;
    }
    if (endDateTime > tripEnd) {
      errors.endTime = `End time cannot be after trip end (${tripEnd.toLocaleString()})`;
    }

    // Validate end time is after start time
    if (endDateTime < startDateTime) {
      errors.time = "End time must be after start time";
    }

    // If there are any errors, display them and prevent submission
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
      start_time: startTime,
      end_time: endTime,
      collaborators: collaboratorIds.length > 0 ? collaboratorIds : [],
    };

    onConfirm(eventData); // Pass the event data to the parent component
    onClose();
  };

  const handleAddCollaborator = (username) => {
    setCollaborators([...collaborators, username]);
    setSearchTerm("");
    setSuggestedUsers([]);
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
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.datetimeInput}
                min={tripStartDate ? 
                  new Date(tripStartDate).toISOString().split('T')[0] + 'T00:00' : 
                  ''}
                max={tripEndDate ? 
                  new Date(tripEndDate).toISOString().split('T')[0] + 'T23:59' : 
                  ''}
              />
              {formErrors.startTime && <p className={styles.errorText}>{formErrors.startTime}</p>}
            </div>
            <div className={styles.dateGroup}>
              <label>End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.datetimeInput}
                min={tripStartDate ? 
                  new Date(tripStartDate).toISOString().split('T')[0] + 'T00:00' : 
                  ''}
                max={tripEndDate ? 
                  new Date(tripEndDate).toISOString().split('T')[0] + 'T23:59' : 
                  ''}
              />
              {formErrors.endTime && <p className={styles.errorText}>{formErrors.endTime}</p>}
              {formErrors.time && <p className={styles.errorText}>{formErrors.time}</p>}
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Collaborators</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users"
            className={styles.searchBar}
          />
          {suggestedUsers.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestedUsers.map((user) => (
                <li key={user.id} onClick={() => handleAddCollaborator(user.username)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
          <ul className={styles.collaborators}>
            {collaborators.map((collab, index) => (
              <li key={index}>{collab}</li>
            ))}
          </ul>
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