import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Flag from 'react-world-flags';

const Dashboard = () => {
  // Sample trip data
  const [trips] = useState([
    {
      id: 1,
      title: "Philippines Adventure",
      country: "Philippines",
      countryCode: "PH",
      tripCreator: "Xavier_Paul",
      tripCreatorProfileImage: "https://via.placeholder.com/32", // Placeholder for profile image
      startDate: "2024-12-16",
      endDate: "2025-01-05",
      status: "Planned",
    },
    {
      id: 2,
      title: "Singapore Getaway",
      country: "Singapore",
      countryCode: "SG",
      tripCreator: "AaronsNipples",
      tripCreatorProfileImage: "https://via.placeholder.com/32", // Placeholder for profile image
      startDate: "2024-02-06",
      endDate: "2024-02-15",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Japan Escape",
      country: "Japan",
      countryCode: "JP",
      tripCreator: "tiuditto",
      tripCreatorProfileImage: "https://via.placeholder.com/32", // Placeholder for profile image
      startDate: "2024-11-05",
      endDate: "2024-11-10",
      status: "Completed",
    },
  ]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>

      <table className={styles.tripTable}>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Trip Title</th>
            <th>Country</th>
            <th>Trip Creator</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index} className={styles.tripRow}>
              <td>
                <Flag 
                  code={trip.countryCode} 
                  className={styles.flagIcon} 
                  fallback={<span>🏳️</span>} 
                />
              </td>
              <td>{trip.title}</td>
              <td>{trip.country}</td>
              <td className={styles.creatorColumn}>
                <div className={styles.creatorInfo}>
                  <img
                    src={trip.tripCreatorProfileImage} 
                    alt={trip.tripCreator}
                    className={styles.creatorProfileImage}
                  />
                  <span>{trip.tripCreator}</span>
                </div>
              </td>
              <td>{trip.startDate}</td>
              <td>{trip.endDate}</td>
              <td className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
                {trip.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
