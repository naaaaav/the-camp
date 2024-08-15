import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/home/SearchBar';
import './Home.css';
import apiFetch from '../utils/api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const navigate = useNavigate();
  const query = useQuery().get('query') || '';
  const region = useQuery().get('region') || '';
  const category = useQuery().get('category') || '';

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchResults = async (query, region, category, page) => {
    try {
      const response = await apiFetch(
        `/campsite/?query=${query}&region=${region}&category=${category}&page=${page}&size=9`,
        { method: 'GET' }
      );
      const data = await response.json();
      setResults(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    fetchResults(query, region, category, page);
  }, [query, region, category, page]);

  const handleSearch = (query, region) => {
    setPage(0);
    navigate(`/?query=${query}&region=${region}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      fetchResults(query, region, category, newPage);
    }
  };

  // Pagination 관련 코드 수정
  const getPaginationRange = () => {
    const totalVisiblePages = 7; // 한 번에 보여줄 페이지 수
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    let start = Math.max(0, page - halfVisiblePages);
    let end = Math.min(totalPages, start + totalVisiblePages);

    if (end - start < totalVisiblePages) {
      start = Math.max(0, end - totalVisiblePages);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
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
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="search-result-item">
              <h3>{result.facltNm}</h3>
              <p>{result.addr1}</p>
              <p>{result.intro}</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>

      <div className="pagination">
        <button
          className={`page-button ${page === 0 ? 'active' : ''}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          이전
        </button>

        {getPaginationRange().map((i) => (
          <button
            key={i}
            className={`page-button ${page === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`page-button ${page === totalPages - 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Home;
