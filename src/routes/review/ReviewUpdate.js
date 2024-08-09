import { useState } from 'react';

const ReviewUpdate = () => {
  const {reviewId} = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState();

  const reviewLoadData = async () => {
    const response = await fetch(`http://localhost:8080/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    setReviewData(json);
  }

  useState(()=>{
    reviewLoadData();
  }, [])

  return (
    <div>
      <textarea>
        {reviewData.content}
      </textarea>
      <button>리뷰 수정하기</button>
    </div>
  )
}

export default ReviewUpdate;