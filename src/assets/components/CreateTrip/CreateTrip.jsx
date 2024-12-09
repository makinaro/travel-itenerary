import React, { useState, useEffect } from "react";
import Select from "react-select";
import CountryList from "react-select-country-list";
import styles from "./CreateTrip.module.css";
import { X } from 'lucide-react';

// REPLACE THIS WITH ACTUAL API FETCH
const fetchUsernames = (searchTerm) => {
  const allUsers = ["Xavier_Paul", "AaronsNipples", "tiuditto"];
  return allUsers.filter(username => username.toLowerCase().includes(searchTerm.toLowerCase()));
};

// Function to fetch user ID by username
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
    return userData.id;  // Return the user ID from the response
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

const CreateTrip = ({ isOpen, onClose, onConfirm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [trips, setTrips] = useState([]);

  // GETS ALL COUNTRIES USING PACKAGE
  const options = CountryList().getData();

  // HANDLES SEARCHING
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

  // HANDLES COLLABORATOR FRONT END
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

  const addTrip = (tripData) => {
    setTrips([...trips, tripData]);
    console.log("New trip added:", tripData);
  };

  // BACK-END FUNCTIONALITY
  const handleConfirm = async () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!country) errors.country = "Country is required";
    if (!startDate) errors.startDate = "Start Date is required";
    if (!endDate) errors.endDate = "End Date is required";
    if (new Date(endDate) < new Date(startDate)) errors.date = "End Date cannot be before Start Date";
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    const collaboratorIds = await Promise.all(
      collaborators.map(async (collab) => {
        const userId = await fetchUserIdByUsername(collab);
        return userId;  // Get user IDs for each collaborator
      })
    );
  
    const tripData = {
      title,
      description,
      country,
      startDate,
      endDate,
      collaborators: collaboratorIds,  // Include collaborator IDs in the request
    };
  
    try {
      const response = await fetch("http://localhost:3000/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`,  // Use the JWT token from localStorage
        },
        body: JSON.stringify(tripData),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating trip: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      addTrip(responseData);  // Add the trip to your frontend state if necessary
      onConfirm(responseData); // Call the callback passed to close modal or do other things
      onClose();               // Close the modal
    } catch (error) {
      console.error("Error creating trip:", error);
    }
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
          <label>Country</label>
          <Select
            options={options}
            value={country ? { label: country, value: country } : null}
            onChange={(selectedOption) => setCountry(selectedOption ? selectedOption.value : '')}
            placeholder="Select a country"
          />
          {formErrors.country && <p className={styles.errorText}>{formErrors.country}</p>}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.dateContainer}>
            <div className={styles.dateGroup}>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {formErrors.startDate && <p className={styles.errorText}>{formErrors.startDate}</p>}
            </div>
            <div className={styles.dateGroup}>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {formErrors.endDate && <p className={styles.errorText}>{formErrors.endDate}</p>}
              {formErrors.date && <p className={styles.errorText}>{formErrors.date}</p>}
            </div>
          </div>
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

