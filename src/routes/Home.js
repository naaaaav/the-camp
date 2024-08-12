// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import SearchBar from '../components/home/SearchBar';
import Footer from '../components/Footer';
import './Home.css';
import apiFetch from '../utils/api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const navigate = useNavigate();
  const query = useQuery().get('query');
  const region = useQuery().get('region');
  const category = useQuery().get('category');

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchResults = async (query, region, category, page) => {
    const response = await apiFetch(`/campsite/searchCampsites?query=${query || ''}&region=${region || ''}&category=${category || ''}&page=${page}&size=9`,{
      method:'GET'
    });
    const data = await response.json();
    setResults(data.content);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchResults(query, region, category, page);
  }, [query, region, category, page]);

  const handleSearch = (query, region) => {
    setPage(0);
    navigate(`/?query=${query}&region=${region}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchResults(query, region, category, newPage);
  };

  return (
    <div className="content">
      <header className="home-header">
        <h1>오늘은 어디로 가볼까?</h1>
      </header>
      <SearchBar onSearch={handleSearch} />
      <div className="statistics">
        <div className="stat-item">
          <span>2,528</span>
          <p>전체</p>
        </div>
        <div className="stat-item">
          <span>356</span>
          <p>오지/노지캠핑</p>
        </div>
        <div className="stat-item">
          <span>1,633</span>
          <p>유료캠핑장</p>
        </div>
        <div className="stat-item">
          <span>539</span>
          <p>글램핑/카라반</p>
        </div>
      </div>
      
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="search-result-item">
            <h3>{result.facltNm}</h3>
            <p>{result.addr1}</p>
            <p>{result.intro}</p>
          </div>
        ))}
      </div>
     
      
      
    </div>
  );
};

export default Home;
