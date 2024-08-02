import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={(e) => navigate('/home')}>1</button>
    </div>
  )
}

export default Test;