import React, { useState, useEffect } from "react";
import styles from "../CreateEvent/CreateEvent.module.css";
import { updateTripEvent, deleteTripEvent } from '../../../../api/utils/tripEventsUtils.cjs';
import { getToken, getUserId } from '../../../services/auth';

const EditEvent = ({ isOpen, onClose, onConfirm, onDelete, eventData }) => {
  const [title, setTitle] = useState(eventData.title || "");
  const [startTime, setStartTime] = useState(eventData.start_time || "");
  const [endTime, setEndTime] = useState(eventData.end_time || "");
  const [collaborators, setCollaborators] = useState(eventData.collaborators || []);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.searchBar}`)) {
        setCollaborators([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

    const updatedEventData = {
      ...eventData,
      title,
      start_time: startTime,
      end_time: endTime,
      collaborators: collaboratorIds,
    };

    try {
      const updatedEvent = await updateTripEvent(getUserId(), updatedEventData, getToken());
      onConfirm(updatedEvent);
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTripEvent(getUserId(), eventData.trip_id, eventData.trip_event_id, getToken());
      onDelete(eventData.trip_event_id);
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.CreateYourTrip}>Edit This Event</h2>
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
              />
              {formErrors.startTime && <p className={styles.errorText}>{formErrors.startTime}</p>}
            </div>
            <div className={styles.dateGroup}>
              <label>End Time</label>
              <input
                type="datetime-local"
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
          <button onClick={handleConfirm}>Save</button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
