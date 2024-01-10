import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecommendSection.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const RecommendSection = () => {
  const [products, setProducts] = useState([]);
  const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.allProducts);
      } catch (error) {
        console.error('데이터를 가져오는 중 에러', error);
      }
    };

    fetchProducts();
  }, []);

  const slides = [];
  for (let i = 0; i < products.length; i += 4) {
    slides.push(
      <SwiperSlide key={i}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {products.slice(i, i + 4).map((product) => (
            <Link
              to={`/product/${product.productId}`}
              style={{ textDecoration: 'none' }}
              key={product.productId}
              className={styles.productsItem}
            >
              <div key={product.productId}>
                <img
                  className={styles.productImage}
                  src={product.thumbnailImage}
                  alt={product.productName}
                />
                <p className={styles.productName}>{product.productName}</p>
                <p className={styles.discountPercent}>
                  {product.discountPercent}
                </p>
                <p className={styles.productPrice}>{product.productPrice}원</p>
                <p className={styles.productRetailPrice}>
                  {product.retailPrice}원
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SwiperSlide>,
    );
  }

  return (
    <div className={styles.recommendSection}>
      <p className={styles.recommendSectionTitle}>이 상품 어때요?</p>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation={{ prevEl: '.prevSlide', nextEl: '.nextSlide' }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsPrevButtonVisible(swiper.realIndex !== 0);
        }}
      >
        {slides}
      </Swiper>
      {isPrevButtonVisible && (
        <div
          className={`${styles.prevSlide} prevSlide`}
          onClick={() => swiperRef.current.slidePrev()}
        >
          <MdOutlineNavigateBefore className={styles.itemPrevIcon} />
        </div>
      )}
      <div
        className={`${styles.nextSlide} nextSlide`}
        onClick={() => swiperRef.current.slideNext()}
      >
        <MdOutlineNavigateNext className={styles.itemNextIcon} />
      </div>
    </div>
  );
};

export default RecommendSection;
