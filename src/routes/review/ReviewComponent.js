import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { likeFlagAtom, reviewFlagAtom } from '../../recoil/atom/UserAtom';
import apiFetch from '../../utils/api';
import likeImg from '../../resources/img/like.png';

const ReviewComponent = ({ item, loginEmail, isDisplay, ImgUrl }) => {
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
    try {
      const response = await apiFetch(`/reviews/like/${review.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        }
      });
  
      const json = await response.json();
      setReview(prev => ({...prev, likeCount : json.likeCount}))
    } catch(error) {
      console.log("좋아요 : " + error.message);
      if (error.message === "404") {
        alert("로그인 후 이용해주세요");
      }
    }
  }

  return (
    <div>
      {review !== null ?       
      <div style={{ border: '1px solid #D9D9D9', padding: '10px', borderRadius : '8px' }}>
        <h4 style={{display : isDisplay ? 'block' : 'none'}}>
          캠핑장 명 : <Link to={`/detail/${review.campsiteSeq}`}>{review.campName}
          <br /><br />
          <img src={review.campsiteUrl} style={{width : '200px', height : '150px', borderRadius : '10px'}} />
          </Link>
        </h4>
        <p>작성자 : {review.userName}</p>
        <p>내용 : {review.content}</p>
        <div onClick={reviewLikeCountClick}>
          <p><img src= {likeImg} width={'20px'} height={'20px'} /> {review.likeCount}</p>  
        </div>
        {review.email === loginEmail ?
        <div>
          <button className='Review-Update-Button' onClick={reviewUpdateClick}>수정하기</button>
          <button className='Review-Delete-Button' onClick={reviewDeleteClick}>삭제하기</button>
        </div> : null}
      </div>: null}
    </div>     
  )
}

export default ReviewComponent;