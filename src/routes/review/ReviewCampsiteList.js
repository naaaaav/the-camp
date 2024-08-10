import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import PagingComponent from './PagingComponent';
import ReviewComponent from './ReviewComponent';

const ReviewCampsiteList = () => {
  const {campsiteId} = useParams();
  const reviewFlag = useRecoilValue(reviewFlagAtom);
  const [loginEmail, setLoginEmail] = useState();
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const LoadLoginUser = async () => {
    const response = await fetch(`http://localhost:8080/api/user/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem("Authorization")
      }
    });
    const json = await response.json();
    if (response.ok) {
      setLoginEmail(json.email);
    }
  }

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
    setData(null);
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
    LoadLoginUser();
  }, [dataCurrentPage, reviewFlag])

  return (
    <div>
      <h1>캠핑장 리뷰</h1>
      {data?.content.map((item, idx) => (
        <ReviewComponent key={idx} item={item} loginEmail={loginEmail} isLike={true} />
      ))}
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default ReviewCampsiteList;