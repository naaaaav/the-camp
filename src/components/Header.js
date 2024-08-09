import React, { useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../recoil/atom/UserAtom';
import { useAuth } from '../utils/AuthContext'; 
import './Header.css';
import { useSetRecoilState } from 'recoil';
import apiFetch from '../utils/api';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, logOut } = useAuth();
  const role = useRecoilValue(roleAtom);
  const setRole = useSetRecoilState(roleAtom);

  useEffect(() => {
    const fetchRole = async () => {
      const Authorization = localStorage.getItem('Authorization');
      if (Authorization) {
        try {
          const response = await apiFetch('/api/role', {
            method: 'GET',
            headers: {
              "Authorization": Authorization,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const roleData = await response.json();
            setRole(roleData.role);
          } else {
            console.error('역할을 가져오는 데 실패했습니다');
          }
        } catch (error) {
          console.error('역할을 가져오는 중 오류 발생:', error);
        }
      }
    };

    if (loggedIn) {
      fetchRole();
    }
  }, [loggedIn, setRole]);


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
          <button><Link to={"/campList?page=0"}>전체</Link></button>
          <button onClick={() => handleNavClick('글램핑')}>글램핑</button>
          <button onClick={() => handleNavClick('카라반')}>카라반</button>
          <button><Link to={"/theme"}>테마별</Link></button>
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
            <button><Link to={"/campList?page=0"}>전체</Link></button>
            <button onClick={() => handleNavClick('글램핑')}>글램핑</button>
            <button onClick={() => handleNavClick('카라반')}>카라반</button>
            <button><Link to={"/theme"}>테마별</Link></button>
            <button onClick={() => handleNavClick('리뷰')}>리뷰</button>
            <button onClick={() => navigate('/profile')}>Profile</button>

          </>
        );
      case 'ROLE_GUEST':
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="logo"><Link to={"/"}>더캠프</Link></div>
      <div className="nav-login-container">
        <nav className="nav">

          {renderMenu()}

        </nav>
        {loggedIn ? (
          <div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            
            <button className="join-button" onClick={() => navigate('/join')}>Join</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
