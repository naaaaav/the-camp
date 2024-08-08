import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewCreate = () => {
  const {campsiteId} = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  
  const reviewOnChange = (e) => {
    setContent(prev => e.target.value);
  }

  const reviewOnClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reviews/${campsiteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('Authorization')
        },
        body: JSON.stringify({
          content
        }),
      });
  
      if (response.ok) {
        alert('리뷰 작성에 성공했습니다.');
      } else {
        alert('작성권한이 없습니다.');
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>리뷰</h1>
      <input 
        name='content'
        type={'text'}
        value={content}
        onChange={reviewOnChange}
      />
      <button onClick={reviewOnClick}>작성하기</button>
    </div>
  )
}

export default ReviewCreate;