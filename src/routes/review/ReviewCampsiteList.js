import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import PagingComponent from '../../components/paging/PagingComponent';
import ReviewComponent from './ReviewComponent';
import apiFetch from '../../utils/api';

const ReviewCampsiteList = ({ campsiteSeq, isDisplay }) => {
  const reviewFlag = useRecoilValue(reviewFlagAtom);
  const [loginEmail, setLoginEmail] = useState();
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const LoadLoginUser = async () => {
    const response = await apiFetch(`/user`, {
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
    const response = await apiFetch(`/reviews/campsite/${campsiteSeq}?page=${dataCurrentPage}`, {
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
    setData(null);
    reviewCamsite();
    LoadLoginUser();
  }, [dataCurrentPage, reviewFlag])

  console.log(data);

  return (
    <div>
      {data?.content.map((item, idx) => (
        <ReviewComponent
          key={idx} 
          item={item} 
          loginEmail={loginEmail} 
          isLike={true} 
          display={isDisplay} 
        />
      ))}
      {data?.totalElements !== 0 ? <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} /> : null}
    </div>
  )
}

export default ReviewCampsiteList;