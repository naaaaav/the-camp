import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenRefresh = ({ children }) => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      setIsRefreshing(true);
      try {
        const response = await fetch('http://localhost:8080/reissue', {
          method: 'POST',
          credentials: 'include', // 쿠키를 포함하여 요청
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 서버에서 액세스 토큰을 헤더에 포함시키는 경우
          const newAccessToken = response.headers.get('Authorization');
          if (newAccessToken) {
            localStorage.setItem('Authorization', newAccessToken);
            window.location.reload();
          }

          // 리프레시 토큰은 쿠키에 저장되므로 별도로 저장할 필요 없음
        } else {
          console.error('리프레시 토큰 갱신 실패');
          navigate('/login');
        }
      } catch (error) {
        console.error('토큰 갱신 중 오류 발생:', error);
        navigate('/login');
      } finally {
        setIsRefreshing(false);
      }
    };

    // 액세스 토큰이 없거나 만료된 경우에만 갱신 시도
    const token = localStorage.getItem('Authorization');
    if (!token) {
      refreshToken();
    }

  }, [navigate]);

  if (isRefreshing) {
    return <p>Refreshing token...</p>;
  }

  return <>{children}</>;
};

export default TokenRefresh;
