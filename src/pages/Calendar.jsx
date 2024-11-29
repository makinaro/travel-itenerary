import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';

const Calendar = () => {
  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        themeSystem="standard"
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",  // Center for the month title
          end: "prev,next",
        }}
        buttonText={{
          today: "This Month",
        }}
        dayHeaderFormat={{
          weekday: 'long',
        }}
        height="700px"
        dayHeaderContent={(args) => args.text.toUpperCase()}  // Day headers (Mon, Tue, etc.) in uppercase
        titleFormat={{ year: 'numeric', month: 'long' }}  // Format the title as "October 2024"
        events={[
          // Example events to show in the calendar
        ]}
      />
    </div>
  );
};

export default Calendar;
