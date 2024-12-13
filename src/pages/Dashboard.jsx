import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import Flag from 'react-world-flags';
import { getToken, getUserId } from '../services/auth.js';
import countryList from 'react-select-country-list';
import CreateTrip from '../assets/components/CreateTrip/CreateTrip.jsx'; // Import CreateTrip component

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [tripCreated, setTripCreated] = useState(false); // State variable to track trip creation

  async function fetchTrips(userId) {
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
      const parsedTripsData = tripsData.map(trip => {
        const startDate = new Date(trip.start_date).toLocaleDateString();
        const endDate = new Date(trip.end_date).toLocaleDateString();
        return {
          id: trip.id,
          title: trip.title,
          country: countryList().getLabel(trip.country),
          countryCode: trip.country,
          tripCreator: trip.owner.username,
          tripCreatorProfileImage: 'https://via.placeholder.com/32', // Placeholder for profile image
          startDate: startDate,
          endDate: endDate,
          status: trip.status,
        };
      });
      setTrips(parsedTripsData);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    const userId = getUserId();
    fetchTrips(userId);
  }, [tripCreated]); // Re-fetch trips when a new trip is created

  const handleTripCreated = () => {
    setTripCreated(!tripCreated); // Toggle the state to trigger re-fetch
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>

      <CreateTrip onTripCreated={handleTripCreated} /> {/* Pass the callback function */}

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
