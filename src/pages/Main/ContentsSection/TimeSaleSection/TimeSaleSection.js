import React, { useEffect, useState } from 'react';
import styles from './TimeSaleSection.module.css';
import { Link } from 'react-router-dom';

const TimeSaleSection = () => {
  const [item, setItem] = useState([]);

  const time = new Date();
  time.setHours(24, 0, 0, 0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('/data/sale.json');
        const data = await response.json();
        setItem(data.saleItem);
      } catch (error) {
        console.error('데이터를 가져오는 중 에러', error);
      }
    };

    fetchItem();
  }, []);

  const calculateTimeLeft = () => {
    const timeDifference = time - new Date();

    let timeLeft = {};

    if (timeDifference > 0) {
      timeLeft = {
        hours: Math.floor(timeDifference / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference / 1000 / 60) % 60),
        seconds: Math.floor((timeDifference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <div className={styles.timeSaleSection}>
      <div className={styles.timeSale}>
        <p className={styles.timeSaleTitle}>매일 특가</p>
        <p className={styles.timeSaleSubTitle}>24시간 한정 일일 특가</p>
        <span className={styles.timer}>
          {timeLeft.hours < 10 ? `0${timeLeft.hours}:` : `${timeLeft.hours}:`}
        </span>
        <span className={styles.timer}>
          {timeLeft.minutes < 10
            ? `0${timeLeft.minutes}:`
            : `${timeLeft.minutes}:`}
        </span>
        <span className={styles.timer}>
          {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        </span>
        <p className={styles.timeSalelightTitle}>망설이면 늦어요!</p>
      </div>
      <div className={styles.saleProducts}>
        {item.map((product) => (
          <div className={styles.saleProductItem} key={product.productId}>
            <Link
              to={`/product/${product.productId}`}
              style={{ textDecoration: 'none' }}
            >
              <img
                className={styles.saleProductImage}
                src={product.thumbnailImage}
                alt={product.productName}
              />
              <p className={styles.saleProductName}>{product.productName}</p>
              <p className={styles.discountPercent}>
                {product.discountPercent}
              </p>
              <p className={styles.saleProductPrice}>
                {product.productPrice}원
              </p>
              <p className={styles.productRetailPrice}>
                {product.retailPrice}원
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSaleSection;
