import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleNavClick = (category) => {
    navigate(`/?category=${category}`);
  };

  return (
    <header className="header">
      <div className="logo">더캠프</div>
      <div className="nav-login-container">
        <nav className="nav">
          <button><Link to="/campList?page=0">전체</Link></button>
          <button onClick={() => handleNavClick('글램핑')}>글램핑</button>
          <button onClick={() => handleNavClick('카라반')}>카라반</button>
          <button><Link to="/theme">테마별</Link></button>
          <button onClick={() => handleNavClick('리뷰')}>리뷰</button>
        </nav>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </header>
  );
};

export default Header;
