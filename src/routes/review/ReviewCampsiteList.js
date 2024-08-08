import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PagingComponent from './PagingComponent';

const ReviewCampsiteList = () => {
  const {campsiteId} = useParams();
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
  }

  const reviewCamsite = async () => {
    const response = await fetch(`http://localhost:8080/reviews/campsite/${campsiteId}?page=${dataCurrentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();

    if (response.ok) {
      setData(json);
    }
  }

  useEffect(() => {
    reviewCamsite();
  }, [dataCurrentPage])

  return (
    <div>
      <h1>캠핑장 리뷰</h1>
      {data?.content.map(item => (
        <div>
          <input type={'hidden'} name={item.id} value={item.id} />
          <p>작성자 : {item.userName}</p>
          <p>내용 : {item.content}</p>
          <p>좋아요 수 : {item.likeCount}</p>
        </div>
      ))}
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default ReviewCampsiteList;