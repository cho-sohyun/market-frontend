import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import WishListModal from '../WishList/WishListModal';
import CartModal from '../Cart/CartModal';

const ProductDetail = ({ addToWishList, addToCart }) => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [wishListAdd, setWishListAdd] = useState(false);
    const [cartAdd, setCartAdd] = useState(false);
    const [wishListModal, setWishListModal] = useState(false);
    const [cartModal, setCartModal] = useState(false);


    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();
                const product = data.allProducts.find((product) => product.productId === parseInt(productId));
                if (product) {
                    setProductDetail(product);
                } else {
                    console.error(`productId가 ${productId}인 상품을 찾을 수 없습니다.`);
                }
            } catch (error) {
                console.error('상품 상세 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchProductDetail();
    }, [productId]);

    const handleAddtoWishList = () => {
        const newItem = {
          id: productDetail.productId,
          productName: productDetail.productName,
          productPrice: productDetail.productPrice,
          thumbnailImage: productDetail.thumbnailImage,
        };
    
        addToWishList(newItem); // 위시리스트에 상품 추가하기 위해 addToWishList 함수 호출
        setWishListAdd(true);
        handleShowWishListModal();
    };

    const handleAddtoCart = () => {
        const newItem = {
            id: productDetail.productId,
            productName: productDetail.productName,
            productPrice: productDetail.productPrice,
            thumbnailImage: productDetail.thumbnailImage,
            quantity: quantity, // 선택한 수량을 카트 아이템에 추가
          };
      
          addToCart(newItem); // 상품을 cartList에 추가
          setCartAdd(true);
          handleShowCartModal();
    };

    const handleShowWishListModal = () => {
        setWishListModal(true);
    }

    const handleShowCartModal = () => {
        setCartModal(true);
    }

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
                                <h1 className={styles.productName}>{productDetail.productName}</h1>
                                <p className={styles.productDescription}>{productDetail.description}</p>
                            </div>
                            <div className={styles.productDetailPrice}>
                                <p className={styles.discountPercent}>{productDetail.discountPercent}</p>
                                <p className={styles.productPrice}>{productDetail.productPrice}원</p>
                            </div>
                            <div className={styles.productDetailInfo}>
                                <div className={styles.detailTitle}>
                                    <p className={styles.detailName}>포장타입</p>
                                    <p className={styles.detailType}>{productDetail.packing_type_text}</p>
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
                                    <p className={styles.detailType}>{productDetail.expiration_date}</p>
                                </div>
                            </div>
                            <div className={styles.quantityContainer}>
                                <label htmlFor='quantity' className={styles.label}>수량 선택: </label>
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
                                    >위시리스트
                                </button>
                                <button
                                    className={styles.addToCart}
                                    onClick={() => {
                                        if (!cartAdd) {
                                            handleAddtoCart();
                                        }
                                    }}
                                    disabled={cartAdd}
                                    >장바구니에 담기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ProductDetail;


