import React, { useState } from 'react';
import styles from './HeaderBottom.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Category from '../../pages/Category/Category';
import { Link } from 'react-router-dom';

const HeaderBottom = () => {
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className={styles.headerBottom}>
      <div className={styles.headerBottomNav}>
        <div>
          <div
            className={styles.categoryArea}
            onClick={() => setOpenCategory(!openCategory)}
          >
            <AiOutlineMenu className={styles.categoryIcon} />
            <span className={styles.categoryText}>카테고리</span>
            {openCategory && <Category setOpenCategory={setOpenCategory} />}
          </div>
        </div>
        <ul className={styles.navSection}>
          <li className={styles.sectionTitle}>
            <Link to="/new">
              <span className={styles.firstSection}>신상품</span>
            </Link>
          </li>
          <li className={styles.sectionTitle}>
            <span className={styles.secondSection}>베스트</span>
          </li>
          <li className={styles.sectionTitle}>
            <span className={styles.thirdSection}>알뜰쇼핑</span>
          </li>
          <li className={styles.sectionTitle}>
            <span className={styles.forthSection}>특가/혜택</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottom;
