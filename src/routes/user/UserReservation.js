import { useEffect, useRef, useState } from 'react';
import PagingComponent from '../../components/paging/PagingComponent';
import apiFetch from '../../utils/api';

const UserReservation = () => {
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const paymentIdRef = useRef(null);
  const reservationIdRef = useRef(null);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
    setData(null);
  }

  const userReservationData = async () => {
    try {
      const response = await apiFetch(`/user/reservation`, {
        method: 'GET',
        headers: {
          "Authorization": localStorage.getItem('Authorization'),
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setData(null);
    setDataCurrentPage(dataCurrentPage);
    userReservationData();
  }, [dataCurrentPage, deleteFlag])

  const cancelPayment = async (paymentId, reservationId, reserveStartDate) => {    
    try {
      console.log("paymentId : " + paymentId);
      console.log("reservationId : " + reservationId);
      console.log("reserveStartDate : " + reserveStartDate);
      const response = await apiFetch(`/payment/cancel`,{
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('Authorization'),
        },
        body: JSON.stringify({
          paymentId,
          reservationId,
          reserveStartDate
        }),
      });
  
      if (response.status === 201) {
        alert("결제 취소 성공");
        setDeleteFlag(!deleteFlag);
      } else if (response.status) {

      }
    } catch(error) {
      if (error.message === "400") {
        alert("하루 전에는 예약을 취소 할 수 없습니다.");
      }
    }
  }

  const reservationCancel = (e, reserveStartDate) => {
    e.preventDefault();
    const paymentId = paymentIdRef.current.value;
    const reservationId = reservationIdRef.current.value;
    console.log(reserveStartDate);
    cancelPayment(paymentId, reservationId, reserveStartDate);
  }

  return (
    <div>
      <h1>유저 예약 목록</h1>
      {data?.content.map((item, idx) => (
        <div key={idx}>
          <p>캠핑장 : {item.campsiteName}</p>
          <p>총 결제 금액 : {item.totalPrice}</p>
          <p>결제 일시 : {item.createdAt}</p>
          <p>성인 (명) : {item.adults}</p>
          <p>아이 (명) : {item.children}</p>
          <p>예약시작일 : {item.reserveStartDate}</p>
          <p>예약종료일 : {item.reserveEndDate}</p>
          <form>
            <input type={'hidden'} value={item.paymentId} ref={paymentIdRef} />
            <input type={'hidden'} value={item.reservationId} ref={reservationIdRef} />
            <button type='button' onClick={(e) => reservationCancel(e, item.reserveStartDate)}>예약 취소하기</button>
          </form>
        </div>
      ))}
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default UserReservation;