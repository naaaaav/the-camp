import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { likeFlagAtom, reviewFlagAtom } from '../../recoil/atom/UserAtom';

const ReviewComponent = ({ item, loginEmail, isLike }) => {
  const navigate = useNavigate();
  const setReviewFlag = useSetRecoilState(reviewFlagAtom);
  const [review, setReview] = useState(item);
  
  const reviewUpdateClick = () => {
    const data = { 
      id : review.id, 
      content: review.content,
      campName : review.campName,
      userName : review.userName
    }
    navigate('/review/update', { state: data});
  }

  const reviewDeleteClick = async () => {
    const confirm = window.confirm("정말 리뷰를 삭제하시겠습니까?");
    if (confirm === false) return;
    const response = await fetch(`http://localhost:8080/reviews/${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      }
    });

    if (response.ok) {
      alert("리뷰가 삭제되었습니다.");
      setReview(null);
      setReviewFlag(prev => !prev);
    }
  }

  const reviewLikeCountClick = async () => {
    const response = await fetch(`http://localhost:8080/reviews/like/${review.id}`, {
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
      <div>
        <h3>캠핑장 명 : {review.campName}</h3>
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