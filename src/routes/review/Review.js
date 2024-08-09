import { useState } from 'react'

const Review = ({item, idx}) => {
  const [review, setReview] = useState(item);
  const [likeCount, setLikeCount] = useState(review.likeCount);


  const reviewLikeCountClick = async () => {
    console.log('클릭되냐');
    const response = await fetch(`http://localhost:8080/reviews/like/${review.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      }
    });

    const json = await response.json();
    console.log(json.likeCount);
  }
  
  // useState(()=>{
  //   reviewLikeCountClick();
  // },[])
  return (
    <div key={idx}>
      <h3>캠핑장 명 : {review.campName}</h3>
      <p>작성자 : {review.userName}</p>
      <p>내용 : {review.content}</p>
      <p>좋아요 수 : {review.likeCount}</p>
      <button onClick={reviewLikeCountClick}>좋아요</button>
    </div>
  )
}

export default Review;