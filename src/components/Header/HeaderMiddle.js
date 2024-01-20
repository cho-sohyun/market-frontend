import React from 'react';
import styles from './HeaderMiddle.module.css';
import { IoLocationOutline } from 'react-icons/io5';
import { VscHeart } from 'react-icons/vsc';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Search/SearchBar';

const HeaderMiddle = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerMiddle}>
      <div className={styles.logoBox}>
        <p
          className={styles.headerLogoimg}
          onClick={() => {
            navigate(`/`);
          }}
        >
          market zero
        </p>
        <p className={styles.headerMarketText}>마켓제로</p>
        <p className={styles.headerBeautyText}>뷰티제로</p>
      </div>
      <div className={styles.headerSearch}>
        <SearchBar />
      </div>
      <div className={styles.headerIconBox}>
        <IoLocationOutline className={styles.headerIcon} />
        <VscHeart
          className={styles.headerIcon}
          onClick={() => {
            navigate(`wishlist`);
          }}
        />
        <BsCart2
          className={styles.headerIcon}
          onClick={() => {
            navigate(`cartlist`);
          }}
        />
      </div>
    </div>
  );
};

export default HeaderMiddle;
