import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.css";
import CreateEvent from "../assets/components/CreateEvent/CreateEvent"; // Import CreateEvent component
import EditEvent from "../assets/components/CreateEvent/EditEvent"; // Import EditEvent component

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Japan Trip",
      start: "2024-12-05T09:00:00",
      end: "2024-12-08T17:00:00",
      details: [
        { time: "09:30 - 10:30", event: "Go to Airport", date: "2024-12-05" },
        { time: "11:00 - 12:00", event: "Visit Tokyo Tower", date: "2024-12-06" },
        { time: "10:00 - 12:00", event: "Explore Kyoto", date: "2024-12-07" },
        { time: "14:00 - 16:00", event: "Dinner in Osaka", date: "2024-12-08" },
      ],
    },
    {
      id: "2",
      title: "Paris Trip",
      start: "2024-12-10T10:00:00",
      end: "2024-12-13T18:00:00",
      details: [
        { time: "08:00 - 09:00", event: "Breakfast at the Hotel", date: "2024-12-10" },
        { time: "12:00 - 13:00", event: "Visit Louvre Museum", date: "2024-12-11" },
        { time: "13:00 - 14:00", event: "testing duplicate", date: "2024-12-11" },
        { time: "15:00 - 18:00", event: "Seine River Cruise", date: "2024-12-12" },
        { time: "09:00 - 10:00", event: "Eiffel Tower", date: "2024-12-13" },
      ],
    },
    {
      id: "3",
      title: "Testing Trip without details",
      start: "2024-12-17T10:00:00",
      end: "2024-12-18T18:00:00",
      details: [{}],
    },
  ]);

  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false); // Track EditEvent modal visibility
  const [currentEventForEdit, setCurrentEventForEdit] = useState(null); // Track event to edit

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    setHighlightedEvent((prev) => (prev === eventId ? null : eventId));
  };

  const highlightedEventDetails = events.find(
    (event) => event.id === highlightedEvent
  );

  const handleOpenCreateEvent = () => {
    setCreateEventModalOpen(true); 
  };

  const handleCloseCreateEvent = () => {
    setCreateEventModalOpen(false); 
  };

  const handleConfirmCreateEvent = (eventData) => {
    console.log("Event Created:", eventData); 
    setCreateEventModalOpen(false);
    setEvents((prevEvents) => [...prevEvents, eventData]); // Add new event to state
  };

  // Handle opening EditEvent modal with the selected event
  const handleOpenEditEvent = (eventDetail) => {
    setCurrentEventForEdit(eventDetail);
    setEditEventModalOpen(true);
  };

  // Handle updating event
  const handleUpdateEvent = (updatedEventData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEventData.id
          ? { ...event, details: updatedEventData.details }
          : event
      )
    );
    setEditEventModalOpen(false); // Close the EditEvent modal
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
        highlightedEventDetails && highlightedEventDetails.details.length > 0 &&
          highlightedEventDetails.details.every(detail => detail.event && detail.date) ? (
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
                <button className={styles.addEventButton} onClick={handleOpenCreateEvent}>
                  + Add an Event
                </button>
              </div>
              <div className={styles.eventDetailsContainer}>
                {Object.entries(
                  highlightedEventDetails.details.reduce((acc, detail) => {
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
                onClick={handleOpenCreateEvent}
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
        />
      )}

      {isEditEventModalOpen && (
        <EditEvent
          isOpen={isEditEventModalOpen}
          onClose={() => setEditEventModalOpen(false)}
          onConfirm={handleUpdateEvent}
          eventData={currentEventForEdit}
        />
      )}
    </div>
  );
};

export default Calendar;
