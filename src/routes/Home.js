import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return <div>
    <h1>초기 메인 페이지</h1>
    <button onClick={(e) => navigate('/login')}>로그인</button>
  </div>
  
}

export default Home;