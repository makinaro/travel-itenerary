import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';

const Calendar = () => {
  // State to manage events
  const [events, setEvents] = useState([
    {
      title: 'Event #1',
      start: '2024-12-05',
      end: '2024-12-08',
      description: 'This is a detailed description for Event #1. This text should be truncated when it overflows.',
    },
    {
      title: 'Event #2',
      start: '2024-12-10',
      end: '2024-12-11',
      description: 'This is a description for Event #2.',
    },
  ]);

  // Utility function to handle date adjustments and formatting
  const formatEventEndDate = (date) => {
    const localDate = new Date(date);
    localDate.setDate(localDate.getDate() - 1); // Adjust only the end date by subtracting 1 day
    return localDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Function to add a new trip
  const addTrip = (tripData) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        title: tripData.title,
        start: tripData.startDate,
        end: tripData.endDate,
        description: tripData.description,
      },
    ]);
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
        events={events} // Use state events here
        eventContent={(eventInfo) => {
          const formattedStartDate = eventInfo.event.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const formattedEndDate = formatEventEndDate(eventInfo.event.end);

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
      />
    </div>
  );
};

export default Calendar;
