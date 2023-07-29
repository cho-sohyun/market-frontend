import React from 'react';
import styles from './Main.module.css';
import RecommendSection from './ContentsSection/RecommendSection/RecommendSection';
import TimeSaleSection from './ContentsSection/TimeSaleSection/TimeSaleSection';
import MainBanner from './Banner/MainBanner';
import HotProducts from './ContentsSection/RecommendSection/HotProducts';

const Main = () => {
    return (
        <div className={styles.main}>
            <MainBanner />
            <RecommendSection />
            <TimeSaleSection />
            <HotProducts />
        </div>
    )
};

export default Main;