import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const filteredSuggestions = data.allProducts
          .filter((product) =>
            product.productName.includes(keyword.toLowerCase()),
          )
          .map((product) => product.productName);
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [keyword]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
      setShowModal(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
      setShowModal(false);
    }
  };

  const handleClickInside = () => {
    setShowModal(true);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.headerSearch}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.headerSearchInput}
          type="text"
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          onClick={handleClickInside}
        />
        <BsSearch className={styles.headerSearchIcon} onClick={handleSubmit} />
      </form>
      {showModal && (
        <div className={styles.modal}>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index} className={styles.suggestion}>
                <p>{suggestion}</p>
              </div>
            ))
          ) : (
            <div className={styles.noSuggestions}>상품명을 입력해주세요.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
