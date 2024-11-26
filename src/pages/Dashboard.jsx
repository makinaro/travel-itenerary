import { useState } from 'react';
import styles from './Dashboard.module.css';
import Flag from 'react-world-flags';

export default function Dashboard() {
  const trips = [
    { title: "Philippines", dates: "Dec 16 - Jan 5", image: "https://via.placeholder.com/300?text=Philippines", countryCode: "PH" },
    { title: "Singapore", dates: "Feb 6 - Feb 15", image: "https://via.placeholder.com/300?text=Singapore", countryCode: "SG" },
    { title: "Japan", dates: "Nov 5 - Nov 10", image: "https://via.placeholder.com/300?text=Japan", countryCode: "JP" },
    { title: "Taiwan", dates: "Sept 1 - Sept 10", image: "https://via.placeholder.com/300?text=Taiwan", countryCode: "TW" },
    { title: "Indonesia", dates: "Aug 1 - Aug 10", image: "https://via.placeholder.com/300?text=Indonesia", countryCode: "ID" },
    { title: "Thailand", dates: "Oct 1 - Oct 10", image: "https://via.placeholder.com/300?text=Thailand", countryCode: "TH" },
    { title: "Vietnam", dates: "Jan 10 - Jan 15", image: "https://via.placeholder.com/300?text=Vietnam", countryCode: "VN" },
    { title: "Malaysia", dates: "Apr 5 - Apr 20", image: "https://via.placeholder.com/300?text=Malaysia", countryCode: "MY" },
    { title: "South Korea", dates: "Mar 10 - Mar 15", image: "https://via.placeholder.com/300?text=South+Korea", countryCode: "KR" },
    { title: "China", dates: "Nov 1 - Nov 20", image: "https://via.placeholder.com/300?text=China", countryCode: "CN" },
    { title: "India", dates: "Oct 10 - Oct 20", image: "https://via.placeholder.com/300?text=India", countryCode: "IN" },
    { title: "Australia", dates: "Dec 1 - Dec 15", image: "https://via.placeholder.com/300?text=Australia", countryCode: "AU" },
  ];

  const tripsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("chronological"); // Default sort

  // Total trips is the original trips count + 1 for the "+ New" card
  const totalTrips = trips.length + 1;
  const totalPages = Math.ceil(totalTrips / tripsPerPage);

  // Function to handle page change
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sort change
  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to the first page after sorting
  };

  // Sort trips based on the selected sort order
  const sortedTrips = sortOrder === "chronological" ? trips.slice().reverse() : trips;

  // Add the "+ New" card only to the first page
  const allTripsWithNew = [{ title: "+ New", dates: "", image: "", countryCode: "" }, ...sortedTrips];

  // Calculate the range of trips for the current page
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;

  // Get trips to show on the current page
  const tripsToShow = allTripsWithNew.slice(indexOfFirstTrip, indexOfLastTrip);

  // Create invisible cards if there are less than 6 trips on the page
  const getInvisibleCards = () => {
    if (tripsToShow.length < tripsPerPage) {
      return Array.from({ length: tripsPerPage - tripsToShow.length }).map((_, index) => (
        <div key={index} className={styles.invisibleTripCard}></div>
      ));
    }
    return [];
  };

  return (
    <div className={styles.dashboard}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search here..."
          className={styles.searchInput}
        />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Username's Dashboard</h1>
      </div>

      {/* Trips Section */}
      <div className={styles.tripsSection}>
        <div className={styles.tripsHeader}>
          <h2 className={styles.tripsTitle}>Your Trips
          </h2>

          {/* Filter Dropdown (Sort) */}
          <div className={styles.filterDropdown}>
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="chronological">Earliest to Latest</option>
              <option value="reverseChronological">Latest to Earliest</option>
            </select>
          </div>

          {/* Page Navigation */}
          <div className={styles.pageNavigation}>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className={styles.tripsGrid}>
          {/* Trip Cards */}
          {tripsToShow.map((trip, index) => (
            <div
              key={index}
              className={`${styles.tripCard} ${trip.title === "+ New" ? styles.newTripCard : ""
                }`}
            >
              {trip.title === "+ New" ? (
                <h2 className={styles.newTripTitle}>+ New</h2>
              ) : (
                <>
                  <img
                    src={trip.image || "https://via.placeholder.com/300"}
                    alt={trip.title}
                    className={styles.tripImage}
                  />
                  <div className={styles.tripInfo}>
                    <h3 className={styles.tripTitle}>{trip.title}</h3>
                    <p className={styles.tripDates}>{trip.dates || ""}</p>
                  </div>
                </>
              )}
            </div>

          ))}

          {/* Invisible Cards to Fill the Grid */}
          {getInvisibleCards()}
        </div>
      </div>
    </div>
  );
}
