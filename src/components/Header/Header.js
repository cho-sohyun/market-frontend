import React from 'react';
import styles from './Header.module.css';
import HeaderTop from './HeaderTop';
import HeaderMiddle from './HeaderMiddle';
import HeaderBottom from './HeaderBottom';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <HeaderTop />
            <HeaderMiddle />
            <HeaderBottom />
        </div>
    );
};

export default Header;