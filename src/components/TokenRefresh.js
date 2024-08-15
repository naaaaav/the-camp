// components/TokenRefresh.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../recoil/atom/UserAtom';
import apiFetch from '../utils/api';
const TokenRefresh = ({ children }) => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userRole = useRecoilValue(roleAtom); // Recoil에서 role 가져오기

  useEffect(() => {
    const refreshToken = async () => {
      setIsRefreshing(true);
      try {
        const response = await apiFetch('/reissue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const newAccessToken = response.headers.get('Authorization');
        if (newAccessToken) {
          localStorage.setItem('Authorization', newAccessToken);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const token = localStorage.getItem('Authorization');
    if (!token && userRole !== 'GUEST') {
      refreshToken();
    }

  }, [navigate, userRole]);

  if (isRefreshing) {
    return <p>Refreshing token...</p>;
  }

  return <>{children}</>;
};

export default TokenRefresh;
