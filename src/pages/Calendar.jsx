import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Event #1",
      start: "2024-12-05",
      end: "2024-12-08",
      description: "This is a detailed description for Event #1.",
    },
    {
      id: "2",
      title: "Event #2",
      start: "2024-12-10",
      end: "2024-12-11",
      description: "This is a description for Event #2.",
    },
  ]);

  const [highlightedEvent, setHighlightedEvent] = useState(null);

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const eventEl = info.el;

    if (!highlightedEvent) {
      // Case 1: If no event is currently toggled
      setHighlightedEvent(eventId);
      eventEl.classList.add(styles.highlightedEventRed);
      eventEl.classList.remove(styles.highlightedEventBlue);
    } else if (highlightedEvent === eventId) {
      // Case 2: If the same event is clicked again
      setHighlightedEvent(null);
      eventEl.classList.remove(styles.highlightedEventRed);
      eventEl.classList.add(styles.highlightedEventBlue);
    } else {
      // Case 3: If another event is clicked while one is already toggled
      const prevEventEl = document.querySelector(
        `[data-event-id='${highlightedEvent}']`
      );

      // Untoggle the previous event
      if (prevEventEl) {
        prevEventEl.classList.remove(styles.highlightedEventRed);
        prevEventEl.classList.add(styles.highlightedEventBlue);
      }

      // Toggle the new event
      setHighlightedEvent(eventId);
      eventEl.classList.add(styles.highlightedEventRed);
      eventEl.classList.remove(styles.highlightedEventBlue);
    }
  };

  const highlightedEventDetails = events.find(
    (event) => event.id === highlightedEvent
  );

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
          const formattedStartDate = eventInfo.event.start.toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );
          const formattedEndDate = new Date(eventInfo.event.end).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );

          return (
            <div className={styles.eventContent}>
              <div className={styles.eventDate}>
                {formattedStartDate} - {formattedEndDate}
              </div>
              <div className={styles.eventTitle}>
                {eventInfo.event.title}
              </div>
            </div>
          );
        }}
        height="750px"
      />
      {/* Highlighted Event Details Section */}
      {highlightedEventDetails && (
        <div className={styles.highlightedEventDetails}>
          <h3>Highlighted Event</h3>
          <p>
            <strong>Title:</strong> {highlightedEventDetails.title}
          </p>
          <p>
            <strong>Description:</strong> {highlightedEventDetails.description}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(highlightedEventDetails.start).toLocaleDateString()} -{" "}
            {new Date(highlightedEventDetails.end).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
