import { useEffect, useRef, useState } from 'react';
import PagingComponent from '../../components/paging/PagingComponent';
import apiFetch from '../../utils/api';
import './UserReservation.css';

const UserReservation = () => {
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const paymentIdRef = useRef(null);
  const reservationIdRef = useRef(null);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    console.log(selected);
    setDataCurrentPage(selected);
    setData(null);
  }

  const userReservationData = async () => {
    try {
      const response = await apiFetch(`/user/reservation?page=${dataCurrentPage}`, {
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
      console.log("예약취소 " + error.message);
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
    <div className='user-reservation-container'>
      <span className='user-reservation-title'>유저 예약 목록</span>
      <hr />
      <table>
        <tr>
          <td>캠핑장</td>
          <td>결제 금액</td>
          <td>결제 일시</td>
          <td>성인 (명)</td>
          <td>아이 (명)</td>
          <td>예약 시작일</td>
          <td>예약 종료일</td>
        </tr>
      {data?.content.map((item, idx) => (
        <tr key={idx}>
          <td>{item.campsiteName}</td>
          <td>{item.totalPrice}</td>
          <td>{item.createdAt}</td>
          <td>{item.adults}</td>
          <td>{item.children}</td>
          <td>{item.reserveStartDate}</td>
          <td>{item.reserveEndDate}</td>
          <td>
            <form>
              <input type={'hidden'} value={item.paymentId} ref={paymentIdRef} />
              <input type={'hidden'} value={item.reservationId} ref={reservationIdRef} />
              <button className='user-reservation-button' type='button' onClick={(e) => reservationCancel(e, item.reserveStartDate)}>예약 취소</button>
            </form>
          </td>
        </tr>
      ))}
      </table>
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default UserReservation;