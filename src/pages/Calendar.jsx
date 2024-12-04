import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Event #1',
      start: '2024-12-05',
      end: '2024-12-08',
      description: 'This is a detailed description for Event #1.',
    },
    {
      id: '2',
      title: 'Event #2',
      start: '2024-12-10',
      end: '2024-12-11',
      description: 'This is a description for Event #2.',
    },
  ]);

  const [highlightedEvent, setHighlightedEvent] = useState(null);

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const eventEl = info.el;

    // Case 1: If no event is currently toggled
    if (!highlightedEvent) {
      console.log(`Toggled ${info.event.title}`);
      setHighlightedEvent(eventId);
      eventEl.classList.add(styles.highlightedEventRed); // Add red class (toggled)
      eventEl.classList.remove(styles.highlightedEventBlue); // Remove blue class (untoggled)
    } else {
      // Case 2: If the same event is clicked again
      if (highlightedEvent === eventId) {
        console.log(`Untoggled ${info.event.title}`);
        setHighlightedEvent(null);
        eventEl.classList.remove(styles.highlightedEventRed); // Remove red class
        eventEl.classList.add(styles.highlightedEventBlue); // Add blue class (untoggled)
      } else {
        // Case 3: If another event is clicked while one is already toggled
        console.log(`Untoggled ${events.find(event => event.id === highlightedEvent).title} and Toggled ${info.event.title}`);
        
        // Untoggle the previous event
        const prevEventEl = document.getElementById(highlightedEvent);
        if (prevEventEl) {
          prevEventEl.classList.remove(styles.highlightedEventRed); // Remove red class
          prevEventEl.classList.add(styles.highlightedEventBlue); // Add blue class (untoggled)
        }

        // Toggle the new event
        setHighlightedEvent(eventId);
        eventEl.classList.add(styles.highlightedEventRed); // Add red class (toggled)
        eventEl.classList.remove(styles.highlightedEventBlue); // Remove blue class
      }
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        themeSystem="standard"
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        buttonText={{
          today: "This Month",
        }}
        dayHeaderFormat={{
          weekday: 'long',
        }}
        height="750px"
        dayHeaderContent={(args) => args.text.toUpperCase()}
        titleFormat={{ year: 'numeric', month: 'long' }}
        events={events}
        eventContent={(eventInfo) => {
          const formattedStartDate = eventInfo.event.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const formattedEndDate = new Date(eventInfo.event.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

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
        eventClick={handleEventClick} // Attach click handler
      />
    </div>
  );
};

export default Calendar;
