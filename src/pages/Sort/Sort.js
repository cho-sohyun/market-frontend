import React from 'react';
import styles from './Sort.module.css';

const Sort = ({ selectedFilter, handleFilterClick }) => {
  return (
    <div className={styles.productFilterContainer}>
      <p
        className={selectedFilter === '추천순' ? styles.filteredNameSelected : styles.filteredName}
        onClick={() => handleFilterClick('추천순')}
      >
        추천순
      </p>
      <p
        className={selectedFilter === '낮은 가격순' ? styles.filteredNameSelected : styles.filteredName}
        onClick={() => handleFilterClick('낮은 가격순')}
      >
        낮은 가격순
      </p>
      <p
        className={selectedFilter === '높은 가격순' ? styles.filteredNameSelected : styles.filteredName}
        onClick={() => handleFilterClick('높은 가격순')}
      >
        높은 가격순
      </p>
    </div>
  );
};

export default Sort;