import { useNavigate } from 'react-router-dom';

const Test1 = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={(e) => navigate('/user/test2')}>2</button>
    </div>
  )
}

export default Test1;