import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Flag from 'react-world-flags';
import { getToken, getUserId } from '../services/auth.js';
import countryList from 'react-select-country-list';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import the icons
import EditTrip from '../assets/components/CreateTrip/EditTrip.jsx';

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null); // State for the selected trip
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
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
        const parsedTripsData = tripsData.map(trip => {
          const startDate = new Date(trip.start_date).toLocaleDateString();
          const endDate = new Date(trip.end_date).toLocaleDateString();
          return {
            id: trip.trip_id,
            title: trip.title,
            country: countryList().getLabel(trip.country),
            countryCode: trip.country,
            tripCreator: trip.owner.username,
            tripCreatorProfileImage: 'https://via.placeholder.com/32',
            startDate: startDate,
            endDate: endDate,
            status: trip.status,
          };
        });
        setTrips(parsedTripsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrips();
  }, []);

  const indexOfLastTrip = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTrip = indexOfLastTrip - ITEMS_PER_PAGE;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // const handleTripClick = (trip) => {
  //   navigate(`/calendar/${trip.id}`, { 
  //     state: { initialDate: trip.startDate } 
  //   });
  // };       ***Supposed to route to Calendar with respective month***

  const handleEditClick = (tripId) => {
    // to do logic
  };

  //Returns correct trip_ID but 403 (Forbidden) ERROR
  const handleDeleteClick = (tripId) => {
    console.log('Trip ID received:', tripId, typeof tripId);
  
    if (!tripId) {
      setError('Invalid trip ID');
      return;
    }
    
    const deleteTrip = async () => {
      const userId = getUserId();
  
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/trips/${tripId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete trip');
        }
  
        // Remove the deleted trip from the state
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      } catch (error) {
        setError(error.message);
      }
    };

    deleteTrip();
  };


  if (trips.length === 0 && !error) {
    return <div>Loading trips...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>

      {error && <p className={styles.error}>{error}</p>}

      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <>
          <table className={styles.tripTable}>
            <thead>
              <tr>
                <td>Flag</td>
                <td>Trip Title</td>
                <td>Country</td>
                <td>Trip Creator</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {currentTrips.map((trip) => (
                <tr key={trip.trip_id ?? Math.random()}
                  // onClick={() => handleTripClick(trip)} 
                  style={{ cursor: 'pointer' }}
                >
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
                  <td className={styles.actionsColumn}>
                    <FaEdit
                      className={styles.actionIcon}
                      onClick={() => handleEditClick(trip.trip_id)}
                    />
                    <FaTrashAlt
                      className={styles.actionIcon}
                      onClick={() => handleDeleteClick(trip.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.paginationControls}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={styles.previousButton}
            >
              Previous
            </button>

            <span className={styles.pageText}>Page {currentPage} of {totalPages}</span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.nextButton}
            >
              Next
            </button>
          </div>
        </>
      )}
      {isEditModalOpen && selectedTrip && (
        <EditTrip trip={selectedTrip} setIsEditModalOpen={setIsEditModalOpen} />
      )}
    </div>
  );
};

export default Dashboard;
