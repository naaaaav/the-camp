import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import PagingComponent from '../../components/paging/PagingComponent';
import ReviewComponent from './ReviewComponent';
import apiFetch from '../../utils/api';

const ReviewList = () => {
  const reviewFlag = useRecoilValue(reviewFlagAtom);
  const [loginEmail, setLoginEmail] = useState();
  
  const LoadLoginUser = async () => {
    const response = await apiFetch(`/api/user/data`, {
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
  useEffect(() => {
    LoadLoginUser();
  }, [])

  return (
    <div>
      <ReviewLikeDesc loginEmail={loginEmail} reviewFlag={reviewFlag} />
      <ReviewDesc loginEmail={loginEmail} reviewFlag={reviewFlag} />
    </div>
  )
}

const ReviewLikeDesc = ({ loginEmail, reviewFlag }) => {
  const [likeDataCurrentPage, setLikeDataCurrentPage] = useState(0);
  const [likeData, setLikeData] = useState();

  const onLikeDataPageChange = ({ selected }) => {
    setLikeDataCurrentPage(selected);
    setLikeData(null);
  }

  const reviewOrderByLikeDesc = async () => {
    const response = await apiFetch(`/reviews/desc/like?page=${likeDataCurrentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const json = await response.json();
      setLikeData(json);
    }
  }

  console.log(likeData);

  useEffect(() => {
    setLikeData(null);
    setLikeDataCurrentPage(likeDataCurrentPage);
    reviewOrderByLikeDesc();
  }, [likeDataCurrentPage, reviewFlag])

  return (
    <div>
      <h1>리뷰 좋아요 순</h1>
      {likeData?.content.map((item, idx) => (
        <ReviewComponent key={idx} item={item} loginEmail={loginEmail} isLike={false} />
      ))}
      <PagingComponent currentPage={likeData?.number} pageCount={likeData?.totalPages} onPageChange={onLikeDataPageChange} />
    </div>
  )
}

const ReviewDesc = ({ loginEmail, reviewFlag }) => {
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
    setData(null);
  }

  const reviewOrderByDesc = async () => {
    const response = await fetch(`/reviews/desc?page=${dataCurrentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const json = await response.json();
      setData(json);
    }
  }

  useEffect(() => {
    setData(null);
    setDataCurrentPage(dataCurrentPage);
    reviewOrderByDesc();
  }, [dataCurrentPage, reviewFlag])

  console.log(data);

  return (
    <div>
      <h1>리뷰 최신 순</h1>
      {data?.content.map((item, idx) => (
        <ReviewComponent key={idx} item={item} loginEmail={loginEmail} isLike={false} />
      ))}
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default ReviewList;