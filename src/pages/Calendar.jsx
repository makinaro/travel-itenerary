import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.css";
import { fetchTripEvents, createTripEvent, updateTripEvent, deleteTripEvent } from '../../api/utils/tripEventsUtils.cjs';
import CreateEventModal from '../assets/components/CreateEvent/CreateEvent.jsx';
import EditEventModal from '../assets/components/EditEvent/EditEvent.jsx';

const Calendar = ({ tripId }) => {
  const [events, setEvents] = useState([]);
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false);
  const [currentEventForEdit, setCurrentEventForEdit] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchTripEvents(tripId);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching trip events:', error);
      }
    };

    loadEvents();
  }, [tripId]);

  const handleEventClick = (event) => {
    setHighlightedEvent(event.id);
    setCurrentEventForEdit(event);
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      const createdEvent = await createTripEvent(tripId, newEvent);
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEditEvent = async (eventId, updatedEvent) => {
    try {
      const updated = await updateTripEvent(tripId, eventId, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? updated : event))
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteTripEvent(tripId, eventId);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        events={events}
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
        currentEventForEdit && currentEventForEdit.details.length > 0 &&
          currentEventForEdit.details.every(detail => detail.event && detail.date) ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>
                  {currentEventForEdit.title} (
                  {new Date(currentEventForEdit.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  &nbsp;-&nbsp;
                  {new Date(currentEventForEdit.end).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  )
                </h3>
                <button className={styles.addEventButton} onClick={() => setCreateEventModalOpen(true)}>
                  + Add an Event
                </button>
              </div>
              <div className={styles.eventDetailsContainer}>
                {Object.entries(
                  currentEventForEdit.details.reduce((acc, detail) => {
                    const date = detail.date;
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
                        <div className={styles.eventTime}>{detail.time}</div>
                        <div className={styles.eventDescription}>{detail.event}</div>
                        <div
                          className={styles.eventAction}
                          onClick={() => setEditEventModalOpen(true)}
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
                onClick={() => setCreateEventModalOpen(true)}
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
        <CreateEventModal
          onClose={() => setCreateEventModalOpen(false)}
          onCreate={handleCreateEvent}
        />
      )}

      {isEditEventModalOpen && (
        <EditEventModal
          event={currentEventForEdit}
          onClose={() => setEditEventModalOpen(false)}
          onEdit={handleEditEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
