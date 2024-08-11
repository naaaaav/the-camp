import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiFetch from '../../utils/api';

const ReviewUpdate = () => {
  const location = useLocation();
  const { state } = location;
  const [content, setContent] = useState(state.content);

  const reviewUpdateClick = async () => {
    const response = await apiFetch(`/reviews/${state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      },
      body : JSON.stringify({content})
    });
    
    if (response.ok) {
      alert('리뷰 수정 성공');
    }
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  return (
    <div>
      <h1>{state.campName} 리뷰 수정하기</h1>
      <h2>작성자 : {state.userName}</h2>
      <textarea 
        name='content'
        onChange={onChangeContent}
        value={content}
      >
      </textarea>
      <br />
      <button onClick={reviewUpdateClick}>리뷰 수정</button>
    </div>
  )
}

export default ReviewUpdate;