import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
    // 페이지네이션 숫자 생성
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            {pageNumbers.map((number) => (
                <span
                    key={number}
                    className={number === currentPage ? styles.currentPage : styles.pageNumber}
                    onClick={() => paginate(number)}
                >
                    {number}
                </span>
            ))}
        </div>
    );
};

export default Pagination;