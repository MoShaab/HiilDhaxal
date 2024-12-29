// components/Loading.js

import React from 'react';
import styles from './loading.module.css'; // Adjust the path based on your project structure



const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingItem}>
        <div className={styles.loadingImage}></div>
        {/* Multiple lines of loading text (simulating a long article or blog post) */}
        <div className={styles.loadingText}></div>
        <div className={styles.loadingText}></div>
        <div className={styles.loadingText}></div>
        <div className={styles.loadingText}></div>
        <div className={styles.loadingText}></div>
      </div>
    </div>
  );
};

export default Loading;
