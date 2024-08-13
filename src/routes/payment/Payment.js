import * as PortOne from "@portone/browser-sdk/v2";
import apiFetch from "../../utils/api";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Payment.css';

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [userData, setUserData] = useState();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const formatStartDate = formatDateToYYYYMMDD(state.reserveStartDate);
  const formatEndDate = formatDateToYYYYMMDD(state.reserveEndDate);

  useEffect(() => {
    userPayment();
  }, [])

  console.log(userData);

  const userPayment = async () => {
    try {
      const response = await apiFetch(`/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("Authorization")
        }
      });
      if (response.ok) {
        const json = await response.json();
        setUserData(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const kaKaoPaymentAlert = async () => {
    try {
      const paymentId = `kakao-payment-${crypto.randomUUID()}`;

      const response = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PAYMENT_STOREID,
        channelKey: process.env.REACT_APP_PAYMENT_KAKAO_CHANNEL_KEY,
        paymentId: paymentId,
        orderName: `${state.campSiteName} 예약`,
        totalAmount: state.totalPrice,
        customer: {
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
        },
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      if (response.code != null) {
        return alert(response.message);
      }

      const notified = await apiFetch(`/payment/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("Authorization")
        },
        body: JSON.stringify({
          paymentId,
          campsiteSeq: state.campsiteSeq,
          siteSeq: state.siteSeq,
          reserveStartDate: formatStartDate,
          reserveEndDate: formatEndDate,
          adults: state.adults,
          children: state.children,
          campsiteName: state.campSiteName
        }),
      });

      if (notified.status === 400) {
        alert('결제 금액이 일치하지 않습니다.');
        response.code = null;
      }

      if (notified.status === 201) {
        alert("결제되었습니다.");
        navigate("/user/profile");
      }
    } catch (error) {
      alert("결제 실패");
      return;
    }
  }

  const tossPaymentAlert = async () => {
    try {
      const paymentId = `toss-payment-${Math.random().toString(36).slice(2)}`;
      const response = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PAYMENT_STOREID,
        channelKey: process.env.REACT_APP_PAYMENT_TOSS_CHANNEL_KEY,
        paymentId: paymentId,
        orderName: `${state.campSiteName} 예약`,
        totalAmount: state.totalPrice,
        customer: {
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
        },
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      if (response.code != null) {
        return alert(response.message);
      }

      const notified = await apiFetch(`/payment/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("Authorization")
        },
        body: JSON.stringify({
          paymentId,
          campsiteSeq: state.campsiteSeq,
          siteSeq: state.siteSeq,
          reserveStartDate: formatStartDate,
          reserveEndDate: formatEndDate,
          adults: state.adults,
          children: state.children,
          campsiteName: state.campSiteName
        }),
      });

      if (notified.status === 400) {
        alert('결제 금액이 일치하지 않습니다.');
        response.code = null;
      }

      if (notified.status === 201) {
        alert("결제되었습니다.");
        navigate("/profile");
      }
    } catch (error) {
      alert("결제 실패");
      return;
    }
  }

  return (
    <div className='Group'>
      <h2>{state.campSiteName} 캠핑장</h2>
      <hr />
      <h4>예약 일시</h4> 
      <p>{state.reserveStartDate.toLocaleDateString('ko-KR', options)} ~ {state.reserveEndDate.toLocaleDateString('ko-KR', options)}</p>
      <h4>결제금액</h4>
      <p><strong>{state.totalPrice}원</strong></p>
      <h4>인원</h4>
      <p>성인 {state.adults}명, 아이 {state.children}명</p>
      <h4>결제자</h4>
      <p>{userData?.fullName}</p>
      <div className="ButtonGroup">
        <button className='Kakao-Button' onClick={kaKaoPaymentAlert}>카카오결제</button>
        <button className='Toss-Button' onClick={tossPaymentAlert}>토스결제</button>
      </div>
    </div>
  )
}

export default Payment;