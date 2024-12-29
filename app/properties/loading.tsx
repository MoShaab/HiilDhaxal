// components/Loading.js

import React from 'react';
import styles from '@/app/ui/home.module.css';

const Loading = () => {
  // Number of grid items to display (you can adjust this based on your needs)
  const items = new Array(12).fill(true);

  return (
    <div className={styles.loadingContainer}>
      {items.map((_, index) => (
        <div key={index} className={styles.loadingItem}>
          <div className={styles.loadingImage}></div>
          <div className={`${styles.loadingText} ${styles.loadingTextTop}`}></div>
          <div className={`${styles.loadingText} ${styles.loadingTextBottom}`}></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
