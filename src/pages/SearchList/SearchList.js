import React, { useState, useEffect } from 'react';
import styles from './SearchList.module.css';
import Sort from '../Sort/Sort';
import Pagination from '../../components/Pagination/Pagination';
import { Link, useLocation } from 'react-router-dom';

const SearchList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('추천순');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const location = useLocation();
  const searchKeyword =
    new URLSearchParams(location.search).get('keyword') || '';

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

  // 검색 키워드에 따른 상품 필터링
  useEffect(() => {
    let filteredProducts;

    if (searchKeyword !== '') {
      filteredProducts = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    } else {
      filteredProducts = allProducts;
    }

    setSearchResult(filteredProducts);
    console.log(filteredProducts);
    setCurrentPage(1); // 검색 키워드가 변경되면 첫 번째 페이지로 리셋
  }, [searchKeyword, allProducts]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // 필터가 변경되면 첫 번째 페이지로 리셋
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

  const sortedProducts = sortProducts(searchResult, selectedFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.searchList}>
      <div className={styles.searchListContainer}>
        <h3 className={styles.searchListTitle}>
          {searchKeyword ? `'${searchKeyword}'에 대한 검색결과` : '검색결과'}
        </h3>
        <div className={styles.productFilterContainer}>
          <Sort
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className={styles.productContainer}>
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div key={product.productId} className={styles.product}>
                <Link to={`/product/${product.productId}`}>
                  <img
                    src={product.thumbnailImage}
                    className={styles.thumbnailImage}
                    alt={product.productName}
                  />
                  <p className={styles.productName}>{product.productName}</p>
                  <p className={styles.price}>{product.productPrice}원</p>
                  <p className={styles.discountPercent}>
                    {product.discountPercent}
                  </p>
                  <p className={styles.retailPrice}>{product.retailPrice}원</p>
                </Link>
              </div>
            ))
          ) : (
            <p className={styles.noSearchTitle}>검색 결과가 없습니다.</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={searchResult.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SearchList;
