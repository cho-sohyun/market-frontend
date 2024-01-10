import React, { useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addItem } from '../../store/wishSlice';
import { addItem as addItemToCart } from '../../store/cartSlice';
import CartModal from '../Cart/CartModal';

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wish.items);
  const [showModal, setShowModal] = useState(false);
  const [modalProductDetail, setModalProductDetail] = useState({});

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 위시리스트 상태 불러오기
    const savedWishList = localStorage.getItem('wishList');
    if (savedWishList) {
      const parsedWishList = JSON.parse(savedWishList);
      parsedWishList.forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    // 위시리스트 상태가 변경될 때마다 localStorage에 저장하기
    localStorage.setItem('wishList', JSON.stringify(wishList));
  }, [wishList]);

  // 위시리스트 삭제 핸들러
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    setModalProductDetail(item);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div className={styles.wishList}>
      <div className={styles.wishListContainer}>
        <div className={styles.wishListTitle}>
          <h2 className={styles.wishTitle}>찜한 상품</h2>
          <p className={styles.wishSubDes}>
            찜한 상품은 최대 200개까지 저장됩니다.
          </p>
        </div>
        {wishList.length > 0 ? (
          <div className={styles.wishListProductBox}>
            {wishList.map((item) => (
              <div key={item.id} className={styles.wishListProduct}>
                <img
                  className={styles.wishListProductThumnail}
                  src={item.thumbnailImage}
                  alt={item.productName}
                />
                <div className={styles.wishListProductInfo}>
                  <p className={styles.wishListProductName}>
                    {item.productName}
                  </p>
                  <p className={styles.wishListProductPrice}>
                    {item.productPrice.toLocaleString()}원
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    className={styles.viewProductLink}
                  ></Link>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.deleteBox}
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </button>
                    <button
                      className={styles.goToCart}
                      onClick={() => handleAddToCart(item)}
                    >
                      담기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.wishListEmpty}>
            위시리스트에 담긴 상품이 없습니다.
          </p>
        )}
      </div>
      <CartModal showModal={showModal} productDetail={modalProductDetail} />
    </div>
  );
};

export default WishList;
