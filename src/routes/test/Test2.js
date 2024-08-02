import { useNavigate } from 'react-router-dom';

const Test2 = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={(e) => navigate('/user/test3')}>3</button>
    </div>
  )
}

export default Test2;