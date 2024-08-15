import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { CampListAtom } from '../../recoil/atom/CampListAtom';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; 

function SearchBar(props) {
  const [input, setInput] = useState('');
  const [type, setType] = useState('region');
  const navigate = useNavigate();  
  const [, setCampList] = useRecoilState(CampListAtom); 

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams({ page: 0, query: input, type }).toString();
    navigate(`/campList?${queryParams}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <select className="select" onChange={handleType}>
        <option value="region">지역별</option>
        <option value="title">캠핑장명</option>
      </select>
      <input
        type="text"
        className="input"
        placeholder="검색어를 입력하세요"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
