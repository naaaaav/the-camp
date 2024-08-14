// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import apiFetch from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('Authorization'));

  const logIn = () => setLoggedIn(true);

  const logOut = async () => {
    try {
      await apiFetch('/logout', {
        method: 'POST',
        Credential: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('Authorization');
      setLoggedIn(false);
      // 페이지 리로드
      window.location.reload();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
