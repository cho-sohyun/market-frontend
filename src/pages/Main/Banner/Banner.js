import React, { useEffect, useState, useRef } from 'react';
import styles from './Banner.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const Banner = () => {
  const [slide, setSlide] = useState(0);
  const [bannerList, setBannerList] = useState([]);
  const slideRef = useRef(null);

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

  useEffect(() => {
    if (bannerList.length > 0) {
      slideRef.current.style.transition = 'all 0.4s ease-in-out';
      slideRef.current.style.transform = `translateX(-${slide * 100}%)`;
    }
  }, [slide, bannerList]);

  const showNextSlide = () => {
    if (bannerList.length > 1) {
      setSlide((slide + 1) % bannerList.length);
    }
  };

  const showPrevSlide = () => {
    if (bannerList.length > 1) {
      setSlide((slide - 1 + bannerList.length) % bannerList.length);
    }
  };

  return (
    <div className={styles.bannerCarousel}>
      <div className={styles.bannerCarouselContainer}>
        {bannerList.length > 0 && (
          <div className={styles.bannerList} ref={slideRef}>
            {/* 무한 슬라이드를 위해 첫 번째 슬라이드를 끝에 추가 */}
            {bannerList.map((banner) => (
              <img
                className={styles.bannerImg}
                key={banner.bannerId}
                src={banner.bannerImage}
                alt="배너이미지"
              />
            ))}
            <img
              className={styles.bannerImg}
              key={bannerList[0].bannerId}
              src={bannerList[0].bannerImage}
              alt="배너이미지"
            />
          </div>
        )}
      </div>

      {bannerList.length > 1 && (
        <>
          {slide !== 0 && (
            <div className={styles.prevSlide} onClick={showPrevSlide}>
              <MdOutlineNavigateBefore className={styles.prevIcon} />
            </div>
          )}
          {slide + 1 !== bannerList.length * 2 && (
            <div className={styles.nextSlide} onClick={showNextSlide}>
              <MdOutlineNavigateNext className={styles.nextIcon} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;









