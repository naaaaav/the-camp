import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roleAtom } from '../recoil/atom/UserAtom';
import { useAuth } from '../utils/AuthContext'; 
import './Header.css';
import apiFetch from '../utils/api';
import { Link } from 'react-router-dom';


const PRIVATE_PATHS = ["/user/profile", "/user/payment"];


const Header = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { loggedIn, logOut } = useAuth();
  const role = useRecoilValue(roleAtom);
  const setRole = useSetRecoilState(roleAtom);

  useEffect(() => {
    const fetchRole = async () => {
      const Authorization = localStorage.getItem('Authorization');
      if (Authorization) {
        try {
          const response = await apiFetch('/user/role', {
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
            console.error('Failed to fetch role');
            logOut();
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching role:', error);
          logOut();

          navigate('/login');
        }
      }
    };

    if (loggedIn) {
      fetchRole();
    }
  }, [loggedIn, setRole, navigate,logOut]);

  useEffect(() => {
    const checkAuth = async () => {
      if (PRIVATE_PATHS.includes(location.pathname)) {
        try {
          const response = await apiFetch('/auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            logOut();
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          logOut();
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [location, navigate, logOut]);

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
          <button><Link to={"/theme"}>테마별</Link></button>
          <button onClick={() => navigate('/review/list')}>리뷰</button>
        </>
      );
    }

    switch (role) {
      case 'ROLE_ADMIN':
        return (
          <>
            <button><Link to={"/campList?page=0"}>전체</Link></button>
            <button><Link to={"/theme"}>테마별</Link></button>
            <button onClick={() => navigate('/review/list')}>리뷰</button>
            <button><Link to={"/admin"}>관리</Link></button>
            
          </>
        );
      case 'ROLE_USER':
        return (
          <>
            <button><Link to={"/campList?page=0"}>전체</Link></button>
            <button><Link to={"/theme"}>테마별</Link></button>
            <button onClick={() => navigate('/review/list')}>리뷰</button>
            <button onClick={() => navigate('/user/profile')}>Profile</button>
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
