import React, { useEffect, useState } from 'react';
import styles from './WishListModal.module.css';
import { Link } from 'react-router-dom';

const WishListModal = ({ showModal, productDetail }) => {
    const [visible, setVisible] = useState(showModal);

    useEffect(() => {
        setVisible(showModal);

        if (showModal) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showModal]);

    if (!visible) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.wishListModalProductName}>상품명: {productDetail.productName}</p>
                <h3 className={styles.modalTitle}>위시리스트에 추가했어요!</h3>
                <Link to="/wishList" className={styles.wishListModalBtn}>위시리스트</Link>
            </div>
        </div>
    );
};

export default WishListModal;
