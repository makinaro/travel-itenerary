import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getToken, getUserId } from '../services/auth.js';
import styles from "./Calendar.module.css";
import CreateEvent from "../assets/components/CreateEvent/CreateEvent.jsx"; // Import CreateEvent component
import EditEvent from "../assets/components/EditEvent/EditEvent.jsx"; // Import EditEvent component
import { createTripEvent, fetchTripEvents, updateTripEvent } from '../../api/utils/tripEventsUtils.cjs'; // Import createTripEvent and fetchTripEvents functions

const Calendar = () => {
  const [trips, setTrips] = useState([]);
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null); // State to store the selected trip ID
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false); // Track EditEvent modal visibility
  const [currentEventForEdit, setCurrentEventForEdit] = useState(null); // Track event to edit
  const [error, setError] = useState('');
  const [tripEvents, setTripEvents] = useState([]);
  const [selectedTripStartDate, setSelectedTripStartDate] = useState("");
  const [selectedTripEndDate, setSelectedTripEndDate] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = getUserId();
      if (!userId) {
        setError('User ID not found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/trips`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${getToken()}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch trips');
        }

        const tripsData = await response.json();

        // Format trips data for FullCalendar
        const formattedTrips = tripsData.map(trip => ({
          id: String(trip.trip_id),
          title: trip.title,
          start: trip.start_date,
          end: trip.end_date,
          details: trip.details || [], // Assuming trip details are included in the response
        }));

        setTrips(formattedTrips);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    if (selectedTripId) {
      fetchTripEvents(selectedTripId, getUserId())
        .then(data => setTripEvents(data))
        .catch(error => {
          console.error('Error fetching trip events:', error);
          setError('Error fetching trip events');
        });
    }
  }, [selectedTripId]);

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    setHighlightedEvent((prev) => (prev === eventId ? null : eventId));
    const selectedTrip = trips.find(trip => trip.id === eventId);
    
    if (selectedTrip) {
      setSelectedTripId(selectedTrip.id);
      
      // Ensure proper date parsing
      const startDate = new Date(selectedTrip.start);
      const endDate = new Date(selectedTrip.end);
      
      // Only set if the dates are valid
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        setSelectedTripStartDate(startDate.toISOString().split('T')[0]);
        setSelectedTripEndDate(endDate.toISOString().split('T')[0]);
      } else {
        console.error("Invalid date parsing:", selectedTrip.start, selectedTrip.end);
      }
    }
  };

  const highlightedEventDetails = trips.find(
    (event) => event.id === highlightedEvent
  );

  const handleOpenCreateEvent = (tripId, tripStartDate, tripEndDate) => {
    setSelectedTripId(tripId);
    setSelectedTripStartDate(tripStartDate);
    setSelectedTripEndDate(tripEndDate);
    setIsCreateEventModalOpen(true);
  };

  const handleCloseCreateEvent = () => {
    setIsCreateEventModalOpen(false); 
  };

  const handleConfirmCreateEvent = async (eventData) => {
    try {
      const newEvent = await createTripEvent(
        getUserId(),
        selectedTripId,
        eventData,
        getToken()
      );

      setIsCreateEventModalOpen(false);
      setTripEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event");
    }
  };

  // Handle opening EditEvent modal with the selected event
  const handleOpenEditEvent = (eventDetail) => {
    setCurrentEventForEdit(eventDetail);
    setEditEventModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Call handleDelete from EditEvent component
      setCurrentEventForEdit({ trip_id: selectedTripId, trip_event_id: eventId });
      setEditEventModalOpen(true);

      // Update the state to remove the deleted event
      setTripEvents((prevEvents) => prevEvents.filter(event => event.trip_event_id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event");
    }
  };

  return (
    <div className={styles.calendarContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        events={trips}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => {
          const startDate = new Date(eventInfo.event.start);
          const endDate = new Date(eventInfo.event.end);
          const formattedStartDate = startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const formattedEndDate = endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <div className={styles.eventContent}>
              <strong>
                {formattedStartDate} - {formattedEndDate}
              </strong>
              <div>{eventInfo.event.title}</div>
            </div>
          );
        }}
        eventClassNames={(eventInfo) =>
          highlightedEvent === eventInfo.event.id
            ? styles.highlightedEvent 
            : ""
        }
        height="750px"
      />

      {highlightedEvent ? (
        tripEvents.length > 0 ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>
                  {highlightedEventDetails.title} (
                  {new Date(highlightedEventDetails.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  &nbsp;-&nbsp;
                  {new Date(highlightedEventDetails.end).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  )
                </h3>
                <button className={styles.addEventButton} onClick={() => handleOpenCreateEvent(selectedTripId, selectedTripStartDate, selectedTripEndDate)}>
                  + Add an Event
                </button>
              </div>
              <div className={styles.eventDetailsContainer}>
                {Object.entries(
                  tripEvents.reduce((acc, detail) => {
                    const date = detail.start_time.split("T")[0];
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(detail);
                    return acc;
                  }, {})
                ).map(([date, details], index) => (
                  <div key={index} className={styles.eventRow}>
                    <div className={styles.eventDate}>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    {details.map((detail, idx) => (
                      <div key={idx} className={styles.eventTimeDescription}>
                        <div className={styles.eventTime}>
                          {new Date(detail.start_time).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} - {new Date(detail.end_time).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className={styles.eventDescription}>{detail.title}</div>
                        <div
                          className={styles.eventAction}
                          onClick={() => handleOpenEditEvent(detail)}
                        >
                          EDIT EVENT
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noEventsMessage}>
            <p>
              You have no events planned out for this trip! Click{" "}
              <span
                className={styles.clickableText}
                onClick={() => handleOpenCreateEvent(selectedTripId, selectedTripStartDate, selectedTripEndDate)}
              >
                HERE
              </span>{" "}
              to create more.
            </p>
          </div>
        )
      ) : (
        <div className={styles.selectTripMessage}>
          <p>Click a trip for more details regarding the events planned out for those days!</p>
        </div>
      )}

      {isCreateEventModalOpen && (
        <CreateEvent
          isOpen={isCreateEventModalOpen}
          onClose={handleCloseCreateEvent}
          onConfirm={handleConfirmCreateEvent}
          tripId={selectedTripId} // Pass the selected tripId to CreateEvent
          userId={getUserId()} // Pass the userId to CreateEvent
          token={getToken()} // Pass the token to CreateEvent
          tripStartDate={selectedTripStartDate} // Pass the trip start date to CreateEvent
          tripEndDate={selectedTripEndDate} // Pass the trip end date to CreateEvent
        />
      )}

      {isEditEventModalOpen && (
        <EditEvent
          isOpen={isEditEventModalOpen}
          onClose={() => setEditEventModalOpen(false)}
          onConfirm={(updatedEvent) => {
            setTripEvents((prevEvents) =>
              prevEvents.map((event) =>
                event.trip_event_id === updatedEvent.trip_event_id ? updatedEvent : event
              )
            );
            setEditEventModalOpen(false);
          }}
          onDelete={handleDeleteEvent}
          eventData={currentEventForEdit}
        />
      )}
    </div>
  );
};

export default Calendar;