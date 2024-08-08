import { useState } from 'react'

const Review = ({idx, item}) => {
  const review = useState(item);

  return (
    <div key={idx}>
      <input type={'hidden'} name={review.id} value={review.id} />
      <h3>캠핑장 명 : {review.campName}</h3>
      <p>작성자 : {review.userName}</p>
      <p>내용 : {review.content}</p>
      <p>좋아요 수 : {review.likeCount}</p>
    </div>
  )
}