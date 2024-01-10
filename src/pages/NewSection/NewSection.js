import React, { useState, useEffect } from 'react';
import styles from './NewSection.module.css';
import Pagination from '../../components/Pagination/Pagination';
import Sort from '../Sort/Sort';
import { Link } from 'react-router-dom';

const NewSection = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('추천순');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        console.log('Data from JSON', data);
        setAllProducts(data.allProducts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const sortProducts = (products, filter) => {
    switch (filter) {
      case '추천순':
        return products;
      case '낮은 가격순':
        return products
          .slice()
          .sort(
            (a, b) =>
              parseInt(a.productPrice.replace(',', '')) -
              parseInt(b.productPrice.replace(',', '')),
          );
      case '높은 가격순':
        return products
          .slice()
          .sort(
            (a, b) =>
              parseInt(b.productPrice.replace(',', '')) -
              parseInt(a.productPrice.replace(',', '')),
          );
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(allProducts, selectedFilter);

  // 현재 페이지에 해당하는 상품들만 잘라내기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.newSectionContainer}>
        <h2 className={styles.newSectionTitle}>신상품</h2>
        <div className={styles.productFilterContainer}>
          <Sort
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
        </div>

        <div className={styles.productContainer}>
          {currentItems.map((product) => (
            <div className={styles.productList} key={product.productId}>
              <Link to={`/product/${product.productId}`}>
                <div className={styles.product}>
                  <img
                    className={styles.productImg}
                    src={product.thumbnailImage}
                    alt={product.productName}
                  />
                  <p className={styles.productName}>{product.productName}</p>
                  <p className={styles.productDes}>
                    {product.shortDescription}
                  </p>
                  <p className={styles.productPrice}>
                    {product.productPrice}원
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={sortedProducts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default NewSection;
