import React, { useState, useEffect } from "react";
import styles from "./CreateTrip.module.css";
import { X } from 'lucide-react';

// REPLACE THIS WITH ACTUAL API FETCH
const fetchUsernames = (searchTerm) => {
  const allUsers = ["Xavier_Paul", "AaronsNipples", "tiuditto"];
  return allUsers.filter(username => username.toLowerCase().includes(searchTerm.toLowerCase()));
};

const CreateTrip = ({ isOpen, onClose, onConfirm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [trips, setTrips] = useState([]); 

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
      setSuggestedUsers([]); // Clears suggestions if the search term is empty
    } else {
      const filteredUsers = fetchUsernames(search).filter((user) => !collaborators.includes(user));
      setSuggestedUsers(filteredUsers); // Fetch and filter suggestions based on search term
    }
  };

  const handleAddCollaborator = (collab) => {
    if (!collaborators.includes(collab)) {
      setCollaborators([...collaborators, collab]);
    }
    setSearchTerm(""); // Clear the search bar after selection
  };

  const handleRemoveCollaborator = (index) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const addTrip = (tripData) => {
    setTrips([...trips, tripData]);  // Add new trip to the trips list
    console.log("New trip added:", tripData); // replace this later with actual function
  };

  const handleConfirm = () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!startDate) errors.startDate = "Start Date is required";
    if (!endDate) errors.endDate = "End Date is required";
    if (new Date(endDate) < new Date(startDate)) errors.date = "End Date cannot be before Start Date";
    if (collaborators.length === 0) errors.collaborators = "At least one collaborator is required";
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    const tripData = {
      title,
      description,
      startDate,
      endDate,
      collaborators,
    };
  
    addTrip(tripData);  // Add the new trip when confirmed
  
    onConfirm(tripData); // Pass trip data back to parent (if needed)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.CreateYourTrip}>Create Your Trip</h2>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter trip title"
          />
          {formErrors.title && <p className={styles.errorText}>{formErrors.title}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter trip description"
          ></textarea>
          {formErrors.description && <p className={styles.errorText}>{formErrors.description}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {formErrors.startDate && <p className={styles.errorText}>{formErrors.startDate}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {formErrors.endDate && <p className={styles.errorText}>{formErrors.endDate}</p>}
          {formErrors.date && <p className={styles.errorText}>{formErrors.date}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Search Collaborators</label>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for collaborators"
            />
            {searchTerm && suggestedUsers.length > 0 && (
              <div className={styles.suggestions}>
                {suggestedUsers.map((user) => (
                  <div
                    key={user}
                    className={styles.suggestionItem}
                    onClick={() => handleAddCollaborator(user)}
                  >
                    @{user}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.collaboratorsList}>
          <h4 className={styles.AddedCollaboratorsText}>Added Collaborators</h4>
          {collaborators.length === 0 ? (
            <p className={styles.noCollaborators}>You have not added any collaborators</p>
          ) : (
            collaborators.map((collab, index) => (
              <div key={index} className={styles.collaboratorItem}>
                @{collab}
                <X
                  className={styles.removeCollaborator}
                  onClick={() => handleRemoveCollaborator(index)}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
