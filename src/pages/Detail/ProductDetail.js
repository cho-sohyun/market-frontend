import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import WishListModal from '../WishList/WishListModal';
import CartModal from '../Cart/CartModal';
import { useSelector, useDispatch } from 'react-redux';
import { addItem as addCartItem } from '../../store/cartSlice';
import { addItem as addWishItem } from '../../store/wishSlice';

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishListAdd, setWishListAdd] = useState(false);
  const [cartAdd, setCartAdd] = useState(false);
  const [wishListModal, setWishListModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const userName = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const product = data.allProducts.find(
          (product) => product.productId === parseInt(productId),
        );
        if (product) {
          setProductDetail(product);
        } else {
          console.error('error');
        }
      } catch (error) {
        console.error('상품 상세 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleAddtoWishList = () => {
    if (userName === '') {
      navigate('/login');
    } else {
      const newItem = {
        id: productDetail.productId,
        productName: productDetail.productName,
        productPrice: Number(productDetail.productPrice.replace(/,/g, '')),
        thumbnailImage: productDetail.thumbnailImage,
      };

      dispatch(addWishItem(newItem));
      setWishListAdd(true);
      handleShowWishListModal();
    }
  };

  const handleAddtoCart = () => {
    if (userName === '') {
      navigate('/login');
    } else {
      const newItem = {
        id: productDetail.productId,
        productName: productDetail.productName,
        productPrice: Number(productDetail.productPrice.replace(/,/g, '')),
        thumbnailImage: productDetail.thumbnailImage,
        quantity: quantity,
      };

      dispatch(addCartItem(newItem)); // 상품을 cartList에 추가
      setCartAdd(true);
      handleShowCartModal();
    }
  };

  const handleShowWishListModal = () => {
    setWishListModal(true);
  };

  const handleShowCartModal = () => {
    setCartModal(true);
  };

  const handleCloseModal = () => {
    setWishListModal(false);
    setCartModal(false);
  };

  return (
    <div className={styles.productDetail}>
      <WishListModal
        showModal={wishListModal}
        handleCloseModal={handleCloseModal}
        productDetail={productDetail}
      />
      <CartModal
        showModal={cartModal}
        handleCloseModal={handleCloseModal}
        productDetail={productDetail}
      />
      {productDetail && (
        <div className={styles.productDetailContainer}>
          <img
            className={styles.productThumbnail}
            src={productDetail.thumbnailImage}
            alt={productDetail.productName}
          />
          <div className={styles.productInfo}>
            <div className={styles.productDetailTitle}>
              <h1 className={styles.productName}>
                {productDetail.productName}
              </h1>
              <p className={styles.productDescription}>
                {productDetail.description}
              </p>
            </div>
            <div className={styles.productDetailPrice}>
              <p className={styles.discountPercent}>
                {productDetail.discountPercent}
              </p>
              <p className={styles.productPrice}>
                {productDetail.productPrice}원
              </p>
            </div>
            <div className={styles.productDetailInfo}>
              <div className={styles.detailTitle}>
                <p className={styles.detailName}>포장타입</p>
                <p className={styles.detailType}>
                  {productDetail.packing_type_text}
                </p>
              </div>
              <div className={styles.detailTitle}>
                <p className={styles.detailName}>중량/용량</p>
                <p className={styles.detailType}>{productDetail.weight}</p>
              </div>
              <div className={styles.detailTitle}>
                <p className={styles.detailName}>원산지</p>
                <p className={styles.detailType}>{productDetail.origin}</p>
              </div>
              <div className={styles.detailTitle}>
                <p className={styles.detailName}>유통기한</p>
                <p className={styles.detailType}>
                  {productDetail.expiration_date}
                </p>
              </div>
            </div>
            <div className={styles.quantityContainer}>
              <label htmlFor="quantity" className={styles.label}>
                수량 선택:{' '}
              </label>
              <input
                type="number"
                id="quantity"
                className={styles.inputQuantity}
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.addToWish}
                onClick={() => {
                  if (!wishListAdd) {
                    handleAddtoWishList();
                  }
                }}
                disabled={wishListAdd}
              >
                위시리스트
              </button>
              <button
                className={styles.addToCart}
                onClick={() => {
                  if (!cartAdd) {
                    handleAddtoCart();
                  }
                }}
                disabled={cartAdd}
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
