import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query, region);
  };

  return (
    <div className="search-bar">
      <select className="region-dropdown" value={region} onChange={handleRegionChange}>
        <option value="">지역</option>
        <option value="카라반">카라반</option>
      </select>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleInputChange}
        placeholder="캠핑장 검색"
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
