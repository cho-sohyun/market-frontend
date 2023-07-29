import React, { useEffect, useState, useRef } from 'react';
import styles from './HotProducts.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const HotProducts = () => {
    const [slide, setSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const slideRef = useRef(null);
    const page = Math.ceil(products.length / 4);

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

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.4s ease-in-out';
        slideRef.current.style.transform = `translateX(-${slide * 50.3}%)`;
    }, [slide]);

        const showNextSlide = () => {
            setSlide(slide => slide + 1);
        };
        const showPrevSlide = () => {
            setSlide(slide => slide - 1);
        };

    return (
        <div className={styles.recommendSection}>
            <p className={styles.recommendSectionTitle}>지금 가장 핫한 상품 !</p>
            <div className={styles.itemCarousel}>
                <div className={styles.productsList} ref={slideRef}>
                    {products.map((product, index) => (
                        <div className={styles.productsItem} key={product.productId}>
                            <img
                                className={styles.productImage}
                                src={product.thumbnailImage}
                                alt={product.productName}
                                />
                            <p className={styles.productName}>{product.productName}</p>
                            <p className={styles.discountPercent}>{product.discountPercent}</p>
                            <p className={styles.productPrice}>{product.productPrice}원</p>
                            <p className={styles.productRetailPrice}>{product.retailPrice}원</p>
                        </div>
                    ))}
                </div>
            </div>
            {slide !== 0 && (
                 <div className={styles.prevSlide} onClick={showPrevSlide}>
                    <MdOutlineNavigateBefore className={styles.itemPrevIcon}/>
                </div>
            )}
            {slide + 1 !== page && (
                <div className={styles.nextSlide} onClick={showNextSlide}>
                    <MdOutlineNavigateNext className={styles.itemNextIcon} />
                </div>
            )}
        </div>
    );
}

export default HotProducts;