import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { likeFlagAtom, reviewFlagAtom } from '../../recoil/atom/UserAtom';
import apiFetch from '../../utils/api';

const ReviewComponent = ({ campsiteSeq, item, loginEmail, isLike, isDisplay }) => {
  const navigate = useNavigate();
  const setReviewFlag = useSetRecoilState(reviewFlagAtom);
  const [review, setReview] = useState(item);
  
  const reviewUpdateClick = () => {
    const data = {
      campsiteSeq : review.campsiteSeq,
      id : review.id, 
      content: review.content,
      campName : review.campName,
      userName : review.userName
    }
    navigate('/user/review/update', { state: data});
  }

  const reviewDeleteClick = async () => {
    console.log(review.id);
    const confirm = window.confirm("정말 리뷰를 삭제하시겠습니까?");
    if (confirm === false) return;
    try {
      const response = await apiFetch(`/reviews/${review.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        }
      });
  
      if (response.ok) {
        setReviewFlag(prev => !prev);
        alert("리뷰가 삭제되었습니다.");
      }
    } catch(error) {
      if (error.message === 404) {
        alert("로그인한 뒤 이용해주세요");
      } else if (error.message === 400) {
        alert("리뷰를 작성자가 아닙니다.");
      }
    }
  }

  const reviewLikeCountClick = async () => {
    const response = await apiFetch(`/reviews/like/${review.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      }
    });

    const json = await response.json();
    setReview(prev => ({...prev, likeCount : json.likeCount}))
  }

  return (
    <div>
      {review !== null ?       
      <div style={{ border: '1px solid #D9D9D9', padding: '10px', borderRadius : '8px' }}>
        <h4 style={{display : isDisplay ? 'block' : 'none'}}>
          캠핑장 명 : <Link to={`/detail/${review.campsiteSeq}`}>{review.campName}</Link>
        </h4>
        <p>작성자 : {review.userName}</p>
        <p>내용 : {review.content}</p>
        <div>
          <p>좋아요 수 : {review.likeCount}</p>
          {isLike ? <button onClick={reviewLikeCountClick}>좋아요</button> : null}
        </div>
        {review.email === loginEmail ?
        <div>
          <button onClick={reviewUpdateClick}>수정하기</button>
          <button onClick={reviewDeleteClick}>삭제하기</button>
        </div> : null}
      </div>: null}
    </div>     
  )
}

export default ReviewComponent;