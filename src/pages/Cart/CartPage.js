import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../store/cartSlice';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 장바구니 상태 불러오기
    const loadedCart = localStorage.getItem('cart');
    if (loadedCart) {
      const parsedCart = JSON.parse(loadedCart);
      parsedCart.forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    // 장바구니 상태가 변경될 때마다 localStorage에 저장하기
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    const item = cartItems.find((item) => item.id === productId);
    dispatch(addItem({ ...item, quantity: newQuantity }));
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.productPrice) * item.quantity,
    0,
  );

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.cartPageTitle}>장바구니</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>장바구니에 담긴 상품이 없습니다.</div>
      ) : (
        <div className={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.thumbnailImage}
                alt={item.productName}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <p className={styles.cartItemName}>{item.productName}</p>
                <p className={styles.cartItemPrice}>
                  {item.productPrice.toLocaleString()}원
                </p>
                <div className={styles.quantityContainer}>
                  <label
                    htmlFor={`quantity-${item.id}`}
                    className={styles.label}
                  >
                    수량 선택 :
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    className={styles.inputQuantity}
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.deleteBox}
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className={styles.totalPriceBox}>
            <span className={styles.totalPrice}>
              총 금액 : {totalPrice.toLocaleString()}원
            </span>
          </div>
          <div className={styles.purchase}>
            <button className={styles.purchaseBtn}>
              <p className={styles.purchaseText}>주문하기</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
