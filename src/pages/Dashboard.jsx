import styles from './Dashboard.module.css';

export default function Dashboard() {
  const trips = [
    { location: "Philippines", dates: "Dec 16 - Jan 5", image: "https://via.placeholder.com/300?text=Philippines" },
    { location: "Singapore", dates: "Feb 6 - Feb 15", image: "https://via.placeholder.com/300?text=Singapore" },
    { location: "Japan", dates: "Nov 5 - Nov 10", image: "https://via.placeholder.com/300?text=Japan" },
    { location: "Taiwan", dates: "Sept 1 - Sept 10", image: "https://via.placeholder.com/300?text=Taiwan" },
    { location: "Indonesia", dates: "Aug 1 - Aug 10", image: "https://via.placeholder.com/300?text=Indonesia" },
  ];

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
        <h2 className={styles.tripsTitle}>Your Trips</h2>
        <p className={styles.tripsSubtitle}>Recent Plans</p>
        <div className={styles.tripsGrid}>
          {/* New Trip Card */}
          <div className={styles.newTripCard}>
          <h2 className={styles.tripsTitle}>+ New</h2>
          </div>

          {/* Existing Trip Cards */}
          {trips.map((trip, index) => (
            <div key={index} className={styles.tripCard}>
              <img
                src={trip.image}
                alt={trip.location}
                className={styles.tripImage}
              />
              <div className={styles.tripInfo}>
                <h3 className={styles.tripLocation}>{trip.location}</h3>
                <p className={styles.tripDates}>{trip.dates}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
