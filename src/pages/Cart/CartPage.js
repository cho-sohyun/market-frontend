import React, { useState } from 'react';
import styles from './CartPage.module.css';

const CartPage = ({ cartItems }) => {
  const [cartList, setCartList] = useState(cartItems);

  const addToCart = (newItem) => {
    // cartList에 newItem 추가
    setCartList((prevCartList) => [...prevCartList, newItem]);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartList = cartList.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartList(updatedCartList);
  };

  if (cartList.length === 0) {
    return <div className={styles.cartPage}>장바구니에 담긴 상품이 없습니다.</div>;
  }

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.cartPageTitle}>장바구니</h2>
      <div className={styles.cartItemsContainer}>
        {cartList.map((item) => (
          <div key={item.productId} className={styles.cartItem}>
            <img
              src={item.thumbnailImage}
              alt={item.productName}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <p className={styles.cartItemName}>{item.productName}</p>
              <p className={styles.cartItemPrice}>{item.productPrice}원</p>
              <div className={styles.quantityContainer}>
                <label htmlFor={`quantity-${item.productId}`} className={styles.label}>
                  수량 선택 :
                </label>
                <input
                  type="number"
                  id={`quantity-${item.productId}`}
                  className={styles.inputQuantity}
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
                 <button className={styles.deleteBox}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
