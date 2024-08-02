import { useNavigate } from 'react-router-dom';

const Test3 = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={(e) => navigate('/user/test')}>4</button>
    </div>
  )
}

export default Test3;