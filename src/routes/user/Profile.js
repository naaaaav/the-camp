import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access'); // 로컬 스토리지에서 JWT 토큰 가져오기

        if (!token) {
          navigate('/login'); // JWT 토큰이 없으면 로그인 페이지로 리디렉션
          return;
        }

        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'access': token, // 커스텀 헤더를 포함
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // HTTP 상태 코드가 2xx가 아니면 에러 발생
        }

        const data = await response.json();
        setProfile(data); // 응답 데이터를 상태에 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 상태에 저장
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProfile(); // 컴포넌트가 마운트될 때 API 호출
  }, [navigate]);

  if (loading) return <p>Loading...</p>; // 로딩 중일 때
  if (error) return <p>Error: {error}</p>; // 에러가 발생한 경우

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Gender: {profile.gender}</p>
          <p>PhoneNumber: {profile.phoneNumber}</p>
          <p>Email: {profile.email}</p>
          <p>Birthday: {profile.birthday}</p>
          
          
         
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
};

export default Profile;
