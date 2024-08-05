// routes/Home.js
import { useNavigate } from 'react-router-dom';
import { logOut, isLoggedIn } from '../utils/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = isLoggedIn();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  console.log(isUserLoggedIn);

  return (
    <div>
      <h1>초기 메인 페이지</h1>
      {isUserLoggedIn ? (
        <><button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate('/profile')}>내 정보</button>
        </>
      ) : (
        <>
          <button onClick={(e) => navigate('/login')}>로그인</button>
          <button onClick={(e) => navigate('/join')}>회원가입</button>
          
          
        </>
      )}
    </div>
  );
};

export default Home;
