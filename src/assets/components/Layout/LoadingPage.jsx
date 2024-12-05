import React from 'react';
import styles from './LoadingPage.module.css';
import logo from '../../Images/logo.png'; // Import the image if it's in the src folder

const LoadingPage = () => {
  // Function to generate a random duration for each image (between 2s and 2.5s)
  const getRandomDuration = () => {
    return `${Math.random() * (2.5 - 2) + 2}s`;
  };

  return (
    <div className={styles.loadingPage}>
      <div className={styles.spinnerContainer}>
        <img
          src={logo}
          alt="Loading..."
          className={styles.spinner}
          style={{ animationDuration: getRandomDuration() }}
        />
        <img
          src={logo}
          alt="Loading..."
          className={styles.spinner}
          style={{ animationDuration: getRandomDuration() }}
        />
        <img
          src={logo}
          alt="Loading..."
          className={styles.spinner}
          style={{ animationDuration: getRandomDuration() }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
