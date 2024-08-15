import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { reviewFlagAtom } from '../../recoil/atom/UserAtom';
import PagingComponent from '../../components/paging/PagingComponent';
import ReviewComponent from './ReviewComponent';
import apiFetch from '../../utils/api';
import './ReviewSelect.css';

const ReviewList = () => {
  const reviewFlag = useRecoilValue(reviewFlagAtom);
  const [loginEmail, setLoginEmail] = useState();
  
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
  useEffect(() => {
    LoadLoginUser();
  }, [])

  return (
    <div>
      <ReviewSort loginEmail={loginEmail} reviewFlag={reviewFlag} />
    </div>
  )
}

const ReviewSort = ({ loginEmail, reviewFlag }) => {
  const [type, setType] = useState("likeCount");
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
    setData(null);
  }

  const onChangeType = (e) => {
    setType(e.target.value);
  }

  const reviewSort = async () => {
    const response = await apiFetch(`/reviews/sort?page=${dataCurrentPage}&type=${type}`, {
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
    reviewSort();
  }, [dataCurrentPage, reviewFlag, type])

  return (
    <div style={{marginLeft : '200px', marginRight : '200px'}}>
      <h1>캠핑장 후기</h1>
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
          isDisplay={true}
        />
      ))}
      {data?.totalElements !== 0 ? <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} /> : null}
    </div>
  )
}

export default ReviewList;