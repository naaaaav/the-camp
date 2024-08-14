import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import apiFetch from '../../utils/api';
import './ReviewUpdate.css';

const ReviewUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const setReviewFlag = useSetRecoilState(reviewFlagAtom);
  const [content, setContent] = useState(state.content);

  const reviewUpdateClick = async () => {
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    
    try {
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
    } catch(error) {
      if (error.message === 404) {
        alert("로그인 한뒤 이용해주세요");
      } else if (error.message === 400) {
        alert("작성자가 아닙니다");
      }
    }
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  return (
    <div className='Group'>
      <h2>{state.campName}</h2>
      <h4>작성자 : {state.userName}</h4>
      <textarea 
        className='Review-Textarea'
        name='content'
        onChange={onChangeContent}
        value={content}
      >
      </textarea>
      <br />
      <button className='Review-Update-Button' onClick={reviewUpdateClick}>수정하기</button>
    </div>
  )
}

export default ReviewUpdate;