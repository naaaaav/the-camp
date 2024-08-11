import { useEffect, useRef, useState } from 'react';
import apiFetch from '../../utils/api';

const UserReservation = () => {
  const paymentIdRef = useRef(null);
  const reservationIdRef = useRef(null);
  const [data, setData] = useState();

  const UserReservationData = async () => {
    try {
      const response = await apiFetch(`/user/reservation/list`, {
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
    UserReservationData();
  }, [])

  const cancelPayment = async (paymentId, reservationId, reserveStartDate) => {    
    const response = await fetch(`http://localhost:8080/payment/cancel`,{
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "access" : localStorage.getItem("access")
      },
      body: JSON.stringify({
        paymentId,
        reservationId,
        reserveStartDate
      }),
    });

    if (response.status === 201) {
      alert("결제 취소 성공");
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
    </div>
  )
}

export default UserReservation;