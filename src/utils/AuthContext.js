// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('Authorization'));

  const logIn = () => setLoggedIn(true);

  const logOut = async () => {
    try {
      // 로그아웃 요청을 서버에 보냄
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키를 포함하여 요청
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 로그아웃 성공 시 로컬 스토리지에서 Authorization 제거
        localStorage.removeItem('Authorization');
        setLoggedIn(false);
        // 페이지 리로드
      
      } else {
        console.error('로그아웃 요청 실패');
      }
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
