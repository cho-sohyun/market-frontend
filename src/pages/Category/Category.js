import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Category.module.css';

const Category = ({ setOpenCategory }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/category.json')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error', error));
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      const subCategoryElement = document.getElementById(
        `subCategory-${categoryId}`,
      );
      if (subCategoryElement) {
        subCategoryElement.style.display = 'block';
      }
    } else {
      const subCategoryElements = document.querySelectorAll(
        '[id^="subCategory-"]',
      );
      subCategoryElements.forEach((element) => {
        element.style.display = 'none';
      });
    }
  }, [categoryId]);

  const findSubCategory = (id) => {
    const subCategory = categories.find(
      (category) => +category.mainCategoriesId === +id,
    );

    return subCategory?.subCategory || [];
  };

  return (
    <div
      className={styles.categoryContainer}
      onMouseLeave={() => setOpenCategory(false)}
    >
      <div className={styles.mainCategory}>
        {categories.map((category) => (
          <li
            key={category.mainCategoriesId}
            id={category.mainCategoriesId}
            className={styles.mainCategoryName}
            onMouseEnter={() => setCategoryId(category.mainCategoriesId)}
            onClick={() => {
              navigate(`/list/${category.mainCategoriesId}`);
            }}
          >
            {category.mainCategoriesName}
          </li>
        ))}
      </div>
      <div
        id={`subCategory-${categoryId}`}
        className={styles.subCategory}
        onMouseLeave={() => setCategoryId(null)}
      >
        {findSubCategory(categoryId)?.map((category) => (
          <span
            key={category.subCategoriesId}
            id={category.subCategoriesId}
            className={styles.subCategoryName}
            onClick={() => {
              navigate(`/list/sub/${category.subCategoriesId}`);
            }}
          >
            {category.subCategoriesName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Category;
