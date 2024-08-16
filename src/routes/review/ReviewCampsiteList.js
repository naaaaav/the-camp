import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import PagingComponent from '../../components/paging/PagingComponent';
import ReviewComponent from './ReviewComponent';
import apiFetch from '../../utils/api';
import './ReviewSelect.css';

const ReviewCampsiteList = ({ campsiteSeq, isDisplay }) => {
  const reviewFlag = useRecoilValue(reviewFlagAtom);
  const [loginEmail, setLoginEmail] = useState();
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();
  const [type, setType] = useState("createdAt");

  const LoadLoginUser = async () => {
    try {
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
    } catch(error) {
      if (error.message === "404") {
        return;
      }
    }
  }

  const onChangeType = (e) => {
    setType(e.target.value);
  }

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
    setData(null);
  }

  const reviewCamsite = async () => {
    const response = await apiFetch(`/reviews/campsite/${campsiteSeq}?page=${dataCurrentPage}&type=${type}`, {
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
  }, [dataCurrentPage, reviewFlag, type])

  return (
    <div>
      {data?.totalElements !== 0 ?
        <select class="custom-select" onChange={onChangeType}>
          <option value="likeCount">좋아요순</option>
          <option value="createdAt">최신순</option>
        </select> : null}
      {data?.content.map((item, idx) => (
        <ReviewComponent
          key={idx} 
          item={item} 
          loginEmail={loginEmail} 
          display={isDisplay}
        />
      ))}
      {data?.totalElements !== 0 ? <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} /> : null}
    </div>
  )
}

export default ReviewCampsiteList;