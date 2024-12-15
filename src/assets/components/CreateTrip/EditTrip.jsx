import React, { useState, useEffect } from "react";
import Select from "react-select";
import CountryList from "react-select-country-list";
import styles from "./CreateTrip.module.css";
import { X } from 'lucide-react';
import { getToken, getUserId } from '../../../services/auth.js';

const fetchUsernames = async (searchTerm) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:3000/users/search/${searchTerm}`, {
      headers: {
        Authorization: `${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return [];
  }
};

const EditTrip = ({ 
  isOpen, 
  onClose, 
  trip,  // Existing trip data to edit
  onUpdateTrip  // Callback to update trip in parent component
}) => {
  const [title, setTitle] = useState(trip.title || "");
  const [description, setDescription] = useState(trip.description || "");
  const [startDate, setStartDate] = useState(
    trip.start_date ? new Date(trip.start_date).toISOString().split('T')[0] : ""
  );
  const [endDate, setEndDate] = useState(
    trip.end_date ? new Date(trip.end_date).toISOString().split('T')[0] : ""
  );
  const [country, setCountry] = useState(trip.country || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState(trip.collaborators || []);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  
  const loggedInUserId = getUserId();
  const options = CountryList().getData();

  // Similar useEffects from CreateTrip
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
    const fetchSuggestions = async () => {
      if (searchTerm) {
        const users = await fetchUsernames(searchTerm);
        const filteredUsers = users.filter(user => 
          user.user_id !== loggedInUserId && 
          !collaborators.some(collab => collab.user_id === user.user_id)
        );
        setSuggestedUsers(filteredUsers);
      } else {
        setSuggestedUsers([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm, collaborators, loggedInUserId]);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    if (search === "") {
      setSuggestedUsers([]);
    }
  };

  const handleAddCollaborator = (collab) => {
    if (!collaborators.some(c => c.user_id === collab.user_id)) {
      setCollaborators([...collaborators, collab]);
    }
    setSearchTerm(""); 
  };

  const handleRemoveCollaborator = (index) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const renderSuggestedUsers = () => {
    return suggestedUsers.map(user => (
      <div key={user.user_id} onClick={() => handleAddCollaborator(user)}>
        {user.username} ({user.email})
      </div>
    ));
  };

  const renderCollaborators = () => {
    if (collaborators.length === 0) {
      return <p className={styles.noCollaborators}>You have not added any collaborators</p>;
    }
    return collaborators.map((collab, index) => (
      <div key={collab.user_id} className={styles.collaboratorItem}>
        @{collab.username} ({collab.email})
        <X
          className={styles.removeCollaborator}
          onClick={() => handleRemoveCollaborator(index)}
        />
      </div>
    ));
  };

  const handleConfirm = async () => {
    console.log('Trip Data to Update:', {
      title,
      country,
      start_date: startDate,
      end_date: endDate,
      collaborators: collaborators.map(collab => collab.user_id),
      tripId: trip.trip_id
    });
    
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!country) errors.country = "Country is required";
    if (!startDate) errors.startDate = "Start Date is required";
    if (!endDate) errors.endDate = "End Date is required";
    if (new Date(endDate) < new Date(startDate)) {
      errors.date = "End Date cannot be before Start Date";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const collaboratorIds = collaborators.map(collab => collab.user_id);
    const tripData = {
      title,
      country,
      start_date: startDate,
      end_date: endDate,
      collaborators: collaboratorIds,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${getUserId()}/trips/${trip.trip_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error(`Error updating trip: ${response.statusText}`);
      }

      const responseData = await response.json();
      onUpdateTrip(responseData);
      onClose();
    } catch (error) {
      console.error("Error updating trip:", error);
      setFormErrors({ submit: error.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.CreateYourTrip}>Edit Your Trip</h2>
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
                {renderSuggestedUsers()}
              </div>
            )}
          </div>
        </div>
        <div className={styles.collaboratorsList}>
          <h4 className={styles.AddedCollaboratorsText}>Added Collaborators</h4>
          {renderCollaborators()}
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Update Trip</button>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;