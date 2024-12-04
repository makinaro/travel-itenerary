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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleCancel = () => {
        // Add any necessary cancel logic here
    };
    
    const handleCreate = () => {
        // Add any necessary create event logic here
    };

    return (
        <FormContainer
            title="Edit your Plan"
            description="Fill in the details below to start editing your plan!"
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
                        <h3 htmlFor="start-date">Start Date</h3>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.timeInputs}>
                        <h3 htmlFor="end-date">End Date</h3>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
