import React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';

const Calendar = () => {
  return (
    <div className={styles.calendarContainer}>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        themeSystem="standard"
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek",
        }}
        buttonText={{
          today: "This Month", // Change "Today" to "This Month"
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        height="700px" // Adjust the calendar height
      />
    </div>
  );
};

export default Calendar;
