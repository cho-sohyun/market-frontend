import React, { useState, useEffect } from 'react';
import styles from './CategoryList.module.css';
import Pagination from '../../components/Pagination/Pagination';
import Sort from '../Sort/Sort';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesAllProducts, setCategoriesAllProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('추천순');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/categoryData.json');
        const jsonData = await response.json();
        console.log(jsonData);

        setCategoriesAllProducts(jsonData.categoriesAllProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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

  const sortedProducts = sortProducts(
    categoriesAllProducts,
    selectedFilter,
    selectedCategory,
  );

  // 현재 페이지에 해당하는 상품들만 잘라내기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const SUBCATEGORIES = [
    {
      mainCategoriesId: 1,
      mainCategoriesName: '채소',
      subCategory: [
        {
          subCategoriesId: 1,
          subCategoriesName: '친환경',
        },
        {
          subCategoriesId: 2,
          subCategoriesName: '고구마・감자・당근',
        },
        {
          subCategoriesId: 3,
          subCategoriesName: '시금치・쌈채소・나물',
        },
        {
          subCategoriesId: 4,
          subCategoriesName: '브로콜리・파프리카・양배추',
        },
        {
          subCategoriesId: 5,
          subCategoriesName: '양파・대파・마늘・배추',
        },
        {
          subCategoriesId: 6,
          subCategoriesName: '오이・호박・고추',
        },
        {
          subCategoriesId: 7,
          subCategoriesName: '냉동・이색・간편채소',
        },
        {
          subCategoriesId: 8,
          subCategoriesName: '콩나물・버섯',
        },
      ],
    },
  ];

  return (
    <div className={styles.categoryList}>
      <div className={styles.categoryListContainer}>
        <h2 className={styles.mainCategoryTitle}>
          {SUBCATEGORIES[0].mainCategoriesName}
        </h2>
        <ul className={styles.subCategoryContainer}>
          {SUBCATEGORIES[0].subCategory.map((subCategory) => (
            <li
              className={styles.subCategory}
              key={subCategory.subCategoriesId}
              onClick={() => handleCategoryClick(subCategory)}
            >
              {subCategory.subCategoriesName}
            </li>
          ))}
        </ul>

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
                    src={product.thumbnailImageUrl}
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

export default CategoryList;
