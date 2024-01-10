import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import styles from './Banner.module.css';

const Banner = () => {
  const [bannerList, setBannerList] = useState([]);
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);

  const goNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goPrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('/data/banner.json', {
          method: 'GET',
        });
        const data = await response.json();
        setBannerList(data.banner);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className={styles.bannerCarousel}>
      <Swiper ref={swiperRef} loop={true}>
        {bannerList.map((banner) => (
          <SwiperSlide key={banner.bannerId}>
            <div className={styles.bannerContainer}>
              <img
                className={styles.bannerImg}
                src={banner.bannerImage}
                alt="배너이미지"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className={styles.nextSlide} onClick={goNext}>
          <MdOutlineNavigateNext className={styles.nextIcon} />
        </div>
        <div className={styles.prevSlide} onClick={goPrev}>
          <MdOutlineNavigateBefore className={styles.prevIcon} />
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
