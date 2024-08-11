import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiFetch from '../../utils/api';

const ReviewCreate = () => {
  const {campsiteId} = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loginName, setLoginName] = useState('');
    
  const reviewOnChange = (e) => {
    setContent(prev => e.target.value);
  }

  const reviewOnClick = async () => {
    try {
      const response = await apiFetch(`/reviews/${campsiteId}`, {
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

  const LoadLoginUser = async () => {
    const response = await apiFetch(`/api/user/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem("Authorization")
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setLoginName(json.fullName);
    }
  }

  useEffect(() => {
    LoadLoginUser();
  }, [])

  return (
    <div>
      <h1>리뷰</h1>
      <h3>작성자 : {loginName} </h3>
      <textarea 
        name='content'
        type={'text'}
        value={content}
        onChange={reviewOnChange}
      >
      </textarea>
      <br />
      <button onClick={reviewOnClick}>작성하기</button>
    </div>
  )
}

export default ReviewCreate;