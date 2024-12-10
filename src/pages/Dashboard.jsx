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

      // Fetch trip creator details for each trip
      const tripsWithCreatorDetails = await Promise.all(
        tripsData.map(async (trip) => {
          const creatorResponse = await fetch(`http://localhost:3000/users/${trip.owner_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${getToken()}`,
            },
          });

          if (!creatorResponse.ok) {
            const errorData = await creatorResponse.json();
            throw new Error(errorData.message || 'Failed to fetch trip creator details');
          }
          const creatorData = await creatorResponse.json();
          const startDate = new Date(trip.start_date).toLocaleDateString();
          const endDate = new Date(trip.end_date).toLocaleDateString();
          return {
            id: trip.trip_id,
            title: trip.title,
            country: countryList().getLabel(trip.country),
            countryCode: trip.country,
            tripCreator: creatorData.username, // Assuming the username field contains the trip creator's name
            tripCreatorProfileImage: 'https://via.placeholder.com/32', // Placeholder for profile image
            startDate: startDate,
            endDate: endDate,
            status: trip.status,
          };
        })
      );
      setTrips(tripsWithCreatorDetails);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTrips();
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
