import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import apiFetch from '../../utils/api';

const ReviewUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const setReviewFlag = useSetRecoilState(reviewFlagAtom);
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
      setReviewFlag(prev => !prev);
      navigate(`/detail/${state.campsiteSeq}`);
    }
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  return (
    <div style={{marginLeft : '35%', marginRight : '35%'}}>
      <h1>{state.campName} 리뷰 수정하기</h1>
      <h2>작성자 : {state.userName}</h2>
      <textarea 
        name='content'
        onChange={onChangeContent}
        value={content}
        style={{width : '500px', height : '600px', fontSize : '25px'}}
      >
      </textarea>
      <br />
      <button onClick={reviewUpdateClick}>리뷰 수정</button>
    </div>
  )
}

export default ReviewUpdate;