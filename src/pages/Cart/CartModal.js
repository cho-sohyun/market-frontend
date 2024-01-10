import React, { useEffect, useState } from 'react';
import styles from './CartModal.module.css';
import { Link } from 'react-router-dom';

const CartModal = ({ showModal, productDetail }) => {
  const [visible, setVisible] = useState(showModal);

  useEffect(() => {
    // showModal prop이 변경되면 visible 상태 업데이트
    setVisible(showModal);

    if (showModal) {
      // 3초 뒤에 모달 창 닫기
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
        <h3 className={styles.modalTitle}>장바구니에 상품을 담았습니다!</h3>
        <p className={styles.modalProductName}>
          상품명: {productDetail.productName}
        </p>
        <Link to="/cartList">
          <p className={styles.modalBtn}>내 장바구니</p>
        </Link>
      </div>
    </div>
  );
};

export default CartModal;
