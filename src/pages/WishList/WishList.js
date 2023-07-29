import React from 'react';
import styles from './WishList.module.css';
import { Link } from 'react-router-dom';

const WishList = ({ wishList = [] }) => {
    if (!wishList || wishList.length === 0) {
        return (
            <div className={styles.wishList}>
                <div className={styles.wishListContainer}>
                    <div className={styles.wishListTitle}>
                        <h2 className={styles.wishTitle}>찜한 상품</h2>
                        <p className={styles.wishSubDes}>찜한 상품은 최대 200개까지 저장됩니다.</p>
                    </div>
                    <div className={styles.wishListProductBox}>
                        <p className={styles.emptyWishList}>찜한 상품이 없습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wishList}>
            <div className={styles.wishListContainer}>
                <div className={styles.wishListTitle}>
                    <h2 className={styles.wishTitle}>찜한 상품</h2>
                    <p className={styles.wishSubDes}>찜한 상품은 최대 200개까지 저장됩니다.</p>
                </div>
                <div className={styles.wishListProductBox}>
                    {wishList.map((item) => (
                        <div key={item.id} className={styles.wishListProduct}>
                            <img
                                className={styles.wishListProductThumnail}
                                src={item.thumbnailImage}
                                alt={item.productName}
                            />
                            <div className={styles.wishListProductInfo}>
                                <p className={styles.wishListProductName}>{item.productName}</p>
                                <p className={styles.wishListProductPrice}>{item.productPrice}원</p>
                                <Link to={`/product/${item.id}`} className={styles.viewProductLink}></Link>
                                <div className={styles.buttonContainer}>
                                    <button className={styles.deleteBox}>삭제</button>
                                    <button className={styles.goToCart}>담기</button>
                                </div>    
                            </div>     
                        </div>         
                    ))}
                </div>              
            </div>
        </div>
    );
};

export default WishList;
