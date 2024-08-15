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
      userName : review.userName,
    }
    navigate('/user/review/update', { state: data});
  }

  const reviewDeleteClick = async () => {
    console.log(review.id);
    const confirm = window.confirm("정말 리뷰를 삭제하시겠습니까?");
    if (confirm === false) return;
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
            <div style={{ border: '1px solid black', padding: '10px' }}>
              <h4 style={{display : isDisplay ? 'block' : 'none'}}>
                캠핑장 명 : <Link to={`/detail/${review.campsiteSeq}`}>{review.campName}</Link>
              </h4>
              <p>작성자 : {review.userName}</p>
              <p>내용 : {review.content}</p>
              <div>
                <p>이미지:</p>
                {review.images && review.images.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {review.images.map((image) => (
                          <img
                              key={image.id}
                              src={image.url}
                              alt={`Review image ${image.id}`}
                              style={{ width: '200px', height: 'auto' }}
                          />
                      ))}
                    </div>
                ) : (
                    <p>No images available</p>
                )}
              </div>
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