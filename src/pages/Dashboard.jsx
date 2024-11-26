import { useState } from 'react';
import styles from './Dashboard.module.css';
import Flag from 'react-world-flags'; // Import the Flag component
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function Dashboard() {
  const trips = [
    { title: "Philippines", dates: "Dec 16 - Jan 5, 2024", image: "https://via.placeholder.com/300?text=Philippines", countryCode: "PH" },
    { title: "Singapore", dates: "Feb 6 - Feb 15, 2024", image: "https://via.placeholder.com/300?text=Singapore", countryCode: "SG" },
    { title: "Japan", dates: "Nov 5 - Nov 10, 2024", image: "https://via.placeholder.com/300?text=Japan", countryCode: "JP" },
    { title: "Taiwan", dates: "Sept 1 - Sept 10, 2024", image: "https://via.placeholder.com/300?text=Taiwan", countryCode: "TW" },
    { title: "Indonesia", dates: "Aug 1 - Aug 10, 2026", image: "https://via.placeholder.com/300?text=Indonesia", countryCode: "ID" },
    { title: "Thailand", dates: "Oct 1 - Oct 10, 2025", image: "https://via.placeholder.com/300?text=Thailand", countryCode: "TH" },
    { title: "Vietnam", dates: "Jan 10 - Jan 15, 2024", image: "https://via.placeholder.com/300?text=Vietnam", countryCode: "VN" },
    { title: "Malaysia", dates: "Apr 5 - Apr 20, 2025", image: "https://via.placeholder.com/300?text=Malaysia", countryCode: "MY" },
    { title: "South Korea", dates: "Mar 10 - Mar 15, 2024", image: "https://via.placeholder.com/300?text=South+Korea", countryCode: "KR" },
    { title: "China", dates: "Nov 1 - Nov 20, 2024", image: "https://via.placeholder.com/300?text=China", countryCode: "CN" },
    { title: "India", dates: "Oct 10 - Oct 20, 2024", image: "https://via.placeholder.com/300?text=India", countryCode: "IN" },
    { title: "Australia", dates: "Dec 1 - Dec 15, 2024", image: "https://via.placeholder.com/300?text=Australia", countryCode: "AU" },
  ];

  const tripsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("chronological");
  const [searchQuery, setSearchQuery] = useState("");

  const totalTrips = trips.length + 1; // Including "+ New" card
  const totalPages = Math.ceil(totalTrips / tripsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page after sorting
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Go back to page 1 when search query changes
  };

  // Function to parse and sort dates
  const parseDate = (dateStr) => {
    const [start, end] = dateStr.split(" - ");
    const year = end.split(", ")[1] || start.split(", ")[1];
    const startDate = new Date(`${start}, ${year}`);
    const endDate = new Date(`${end}, ${year}`);
    return { startDate, endDate };
  };

  const sortedTrips = sortOrder === "chronological"
    ? trips.sort((a, b) => parseDate(a.dates).startDate - parseDate(b.dates).startDate)
    : trips.sort((a, b) => parseDate(b.dates).startDate - parseDate(a.dates).startDate);

  const filteredTrips = sortedTrips.filter(trip =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allTripsWithNew = [...filteredTrips, { title: "+ New", dates: "", image: "", countryCode: "" }];

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;

  const tripsToShow = allTripsWithNew.slice(indexOfFirstTrip, indexOfLastTrip);

  const getInvisibleCards = () => {
    if (tripsToShow.length < tripsPerPage) {
      return Array.from({ length: tripsPerPage - tripsToShow.length }).map((_, index) => (
        <div key={index} className={styles.invisibleTripCard}></div>
      ));
    }
    return [];
  };

  // Placeholder function that currently does nothing
  const handleNewTrip = () => {
    // This function does nothing right now, but can be implemented later
    console.log("New trip action placeholder");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search here..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Username's Dashboard</h1>
        </div>

        <div className={styles.tripsSection}>
          <div className={styles.tripsHeader}>
            <h2 className={styles.tripsTitle}>Your Trips</h2>
            <div className={styles.divWrapper}>
              <div className={styles.filterDropdown}>
                <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
                  <option value="chronological">Earliest to Latest</option>
                  <option value="reverseChronological">Latest to Earliest</option>
                </select>
              </div>

              {totalPages > 1 && (
                <div className={styles.pageNavigation}>
                  <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                  <span>{currentPage} / {totalPages}</span>
                  <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.tripsGrid}>
            {tripsToShow.map((trip, index) => (
              <Link to="/calendar" key={index} className={`${styles.tripCard} ${trip.title === "+ New" ? styles.newTripCard : ""}`}>
                {trip.title === "+ New" ? (
                  <h2 className={styles.newTripTitle}>+ New</h2>
                ) : (
                  <>
                    <img
                      src={trip.image || "https://via.placeholder.com/300"}
                      alt={trip.title}
                      className={styles.tripImage}
                      loading="lazy"
                    />
                    <div className={styles.tripInfo}>
                      <div className={styles.tripTitleWrapper}>
                        <Flag code={trip.countryCode} className={styles.flagIcon} />
                        <h3 className={styles.tripTitle}>{trip.title}</h3>
                      </div>
                      <p className={styles.tripDates}>{trip.dates}</p>
                    </div>
                  </>
                )}
              </Link>
            ))}
            {getInvisibleCards()}
          </div>
        </div>
      </div>
    </div>
  );
}
