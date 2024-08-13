import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import apiFetch from '../../utils/api';
import './ReviewCreate.css';

const ReviewCreate = () => {
  const location = useLocation();
  const { state } = location;
  const {campsiteId} = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loginName, setLoginName] = useState('');
    
  const reviewOnChange = (e) => {
    setContent(prev => e.target.value);
  }

  const reviewOnClick = async () => {
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
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
        navigate(`/detail/${campsiteId}`);
      } else {
        alert('작성권한이 없습니다.');
      }
    } catch(error) {
      console.error(error);
    }
  }

  const LoadLoginUser = async () => {
    const response = await apiFetch(`/user/data`, {
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
    <div className='Group'>
      <h2>{state.campsiteName}</h2>
      <h4>작성자 : {loginName} </h4>
      <textarea
        className='Review-Textarea'
        name='content'
        type={'text'}
        value={content}
        onChange={reviewOnChange}
      >
      </textarea>
      <br />
      <button className='Review-Create-Button' onClick={reviewOnClick}>리뷰 작성</button>
    </div>
  )
}

export default ReviewCreate;