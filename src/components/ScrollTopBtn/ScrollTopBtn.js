import React, { useState, useEffect } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi2';
import styles from './ScrollTopBtn.module.css';

const ScrollTopButton = () => {
  const [isVisble, setIsVisible] = useState(false);

  // 페이지 최상단으로 이동하는 함수
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 스크롤 이벤트 핸들러
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      // 원하는 스크롤 위치에 도달했을 때 버튼이 보이도록 설정
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisble && (
      <button onClick={handleScrollTop} className={styles.scrollTopBtn}>
        <HiOutlineArrowUp className={styles.scrollTopIcon} />
      </button>
    )
  );
};
export default ScrollTopButton;
