import React, { useState } from 'react';
import styles from './Form.module.css';


const FormContainer = ({ title, description, children }) => {
  return (
    <div className={styles.formContainer}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
};

const CreateNewEvent = () => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [eventDescription, setEventDescription] = useState('');

  const handleCancel = () => {
    // Add any necessary cancel logic here
  };

  const handleCreate = () => {
    // Add any necessary create event logic here
  };

  return (
    <FormContainer
      title="Create New Event"
      description="Use this card to quickly set up new events, and plan out your trip with detail!"
    >
      <form className={styles.createEventForm}>
        <div className={styles.formGroup}>
          <h3 htmlFor="event-name">Add Title</h3>
          <textarea
            type="text"
            id="event-name"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.timeInputContainer}>
          <div className={styles.timeInputs}>
            <h3 htmlFor="start-time">From</h3>
            <input
              type="time"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className={styles.timeInputs}>
            <h3 htmlFor="end-time">To</h3>
            <input
              type="time"
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <h3 htmlFor="event-description">Meeting Description</h3>
          <div className={styles.eventDescription}>
            <textarea
              id="event-description"
              placeholder="Add meeting description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={styles.Actions}>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={styles.createBtn}
              onClick={handleCreate}
            >
              CREATE
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateNewEvent;
