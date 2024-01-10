import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ handleSearch, searchKeyword }) => {
  const [keyword, setKeyword] = useState((searchKeyword = ''));
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const wholeTextArray = [
      '친환경 꿀고구마 2kg',
      '닭가슴살 샐러드',
      '베이컨말이 꼬치',
      '초코 브라우니',
      '실속 바나나 1kg (필리핀)',
      '무항생제 대란 20구',
      '극세모 칫솔',
      '소세지 핫도그 3종',
      '스테이크',
    ];

    const updateSuggestions = () => {
      if (keyword === '') {
        setSuggestions([]);
      } else {
        const filteredSuggestions = wholeTextArray.filter((textItem) =>
          textItem.includes(keyword.toLowerCase()),
        );
        setSuggestions(filteredSuggestions);
      }
    };

    updateSuggestions();
  }, [keyword]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(keyword);
    setShowModal(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    setKeyword(suggestion);
    setShowModal(false);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
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
              <div
                key={index}
                className={styles.suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
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
