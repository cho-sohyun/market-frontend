import React, { useState } from 'react';
import styles from './HeaderBottom.module.css';
import { AiOutlineMenu } from "react-icons/ai";
import Category from '../../pages/Category/Category';


const HeaderBottom = () => {
    const [openCategory, setOpenCategory] = useState(false);

    return (
        <div className={styles.headerBottom}>
            <div className={styles.categoryArea} onClick={() => setOpenCategory(!openCategory)}>
                <AiOutlineMenu className={styles.categoryIcon} />
                <p className={styles.categoryText}>카테고리</p>
                {openCategory && <Category setOpenCategory={setOpenCategory} />}
            </div>
            <div className={styles.navSection}>
                <p className={styles.firstSection}>신상품</p>
                <p className={styles.secondSection}>베스트</p>
                <p className={styles.thirdSection}>알뜰쇼핑</p>
                <p className={styles.forthSection}>특가/혜택</p>
            </div>
        </div>
    )
};

export default HeaderBottom;