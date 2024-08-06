import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../recoil/atom/UserAtom';
import { useAuth } from '../utils/AuthContext'; 
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, logOut } = useAuth();
  const role = useRecoilValue(roleAtom);

  const handleNavClick = (category) => {
    navigate(`/?category=${category}`);
  };

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  const renderMenu = () => {
    if (!loggedIn) {
      return (
        <>
          <button><a href="/campList?page=0">전체</a></button>
          <button onClick={() => handleNavClick('글램핑')}>글램핑</button>
          <button onClick={() => handleNavClick('카라반')}>카라반</button>
          <button onClick={() => handleNavClick('테마별')}>테마별</button>
          <button onClick={() => handleNavClick('리뷰')}>리뷰</button>
        </>
      );
    }

    switch (role) {
      case 'ROLE_ADMIN':
        return (
          <>
            <button onClick={() => handleNavClick('어드민')}>Dashboard</button>
            <button onClick={() => handleNavClick('어드민')}>Settings</button>
            <button onClick={() => handleNavClick('')}>Manage Users</button>
          </>
        );
      case 'ROLE_USER':
        return (
          <>
            <button onClick={() => navigate('/user/profile')}>Profile</button>
            <button onClick={() => navigate('/user/settings')}>Settings</button>
          </>
        );
      case 'ROLE_GUEST':
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="logo">더캠프</div>
      <div className="nav-login-container">
        <nav className="nav">
          {renderMenu()}
        </nav>
        {loggedIn ? (
          <div>
            <button onClick={() => navigate('/profile')}>내정보</button>
            <button className="login-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
