import React from 'react';
import styles from './MainBanner.module.css';
import Banner from './Banner';

const MainBanner = () => {
  return (
    <div className={styles.mainBanner}>
      <Banner />
    </div>
  );
};

export default MainBanner;
