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
  const category = useQuery().get('category') || '';  // category가 빈 문자열이면 전체를 의미

  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ total: 0, glamping: 0, caravan: 0 });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAllData = async () => {
    let allResults = [];
    let currentPage = 0;
    let totalElements = 0;

    // 페이지를 반복해서 전체 데이터를 가져오기
    while (true) {
      try {
        const response = await apiFetch(
          `/campsite/?query=${query}&region=${region}&category=${category}&page=${currentPage}&size=100`,
          { method: 'GET' }
        );
        const data = await response.json();
        allResults = allResults.concat(data.content);
        totalElements = data.totalElements;
        currentPage += 1;

        if (currentPage >= data.totalPages) {
          break;
        }
      } catch (error) {
        console.error('Error fetching results:', error);
        break;
      }
    }

    return { allResults, totalElements };
  };

  const fetchResults = async (query, region, category, page) => {
    const { allResults, totalElements } = await fetchAllData();

    // induty 속성에 대한 필터링
    const glampingSites = allResults.filter(item => item.induty.includes('글램핑'));
    const caravanSites = allResults.filter(item => item.induty.includes('카라반'));

    // 전체 캠프사이트 수 계산
    const total = totalElements;

    // 필터링된 결과 설정
    let filteredResults = allResults;
    if (category === 'glamping') {
      filteredResults = glampingSites;
    } else if (category === 'caravan') {
      filteredResults = caravanSites;
    }

    // 통계 및 결과 설정
    setStats({
      total,
      glamping: glampingSites.length,
      caravan: caravanSites.length,
    });

    // 페이지별 결과 설정
    setResults(filteredResults.slice(page * 9, (page + 1) * 9));
    setTotalPages(Math.ceil(filteredResults.length / 9));
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

  const handleFilterClick = (newCategory) => {
    setPage(0); // 페이지를 첫 페이지로 리셋
    navigate(`/?query=${query}&region=${region}&category=${newCategory}`);
  };

  const handleCampsiteClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const getPaginationRange = () => {
    const totalVisiblePages = 7;
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
        <div className="stat-item" onClick={() => handleFilterClick('')}>
          <span>{stats.total}</span>
          <p>전체</p>
        </div>
        <div className="stat-item" onClick={() => handleFilterClick('glamping')}>
          <span>{stats.glamping}</span>
          <p>글램핑</p>
        </div>
        <div className="stat-item" onClick={() => handleFilterClick('caravan')}>
          <span>{stats.caravan}</span>
          <p>카라반</p>
        </div>
      </div>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.seq}
              className="search-result-item"
              onClick={() => handleCampsiteClick(result.seq)}
            >
              {result.firstImageUrl && (
                <img
                  src={result.firstImageUrl}
                  alt={result.facltNm}
                  className="campsite-image"
                />
              )}
              <h3>{result.facltNm}</h3>
              <p>{result.addr1}</p>
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
