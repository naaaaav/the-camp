import * as PortOne from "@portone/browser-sdk/v2";
import apiFetch from "../../utils/api";
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { state } = location;
  console.log("테스트 시작");
  console.log(state);
  console.log("테스트 끝");
  const kaKaoPaymentAlert = async () => {
    try {
      const paymentId = `kakao-payment-${crypto.randomUUID()}`;

      const response = await PortOne.requestPayment({
        storeId: "store-5c664fd7-4801-4c86-8776-e090581e64f7",
        channelKey: "channel-key-8cf77eb8-75e9-46b5-9ef4-20f8c575630d",
        paymentId: paymentId,
        orderName: "나이키 와플 트레이너 2 SD",
        totalAmount: 1000,
        customer : {
          fullName : '안민형',
          phoneNumber : '010-1234-5678',
          email : 'cba@gmail.com',
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
          "access" : localStorage.getItem("access")
        },
        body: JSON.stringify({
          paymentId,
          reservationId : 1
        }),
      });
  
      if(notified.status === 400) {
        alert('결제 금액이 일치하지 않습니다.');
        response.code = null;
      }

      if (response.code != null) {
        return new Error(response.message);
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
        storeId: "store-5c664fd7-4801-4c86-8776-e090581e64f7",
        channelKey: "channel-key-cc1cc64a-17b1-43b9-b633-7b5516169986",
        paymentId: paymentId,
        orderName: "최종 결제 취소 api 테테스트트트",
        totalAmount: 1000000,
        customer : {
          fullName : '안민형',
          phoneNumber : '010-1234-5678',
          email : 'cba@gmail.com',
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
          "access" : localStorage.getItem("access")
        },
        body: JSON.stringify({
          paymentId,
          reservationId : 1
        }),
      });
  
      if (notified.status === 400) {
        alert('결제 금액이 일치하지 않습니다.');
        response.code = null;
      }

      if (response.code != null) {
        return new Error(response.message);
      }

    } catch (error) {
      alert("결제 실패");
      return;
    }
  }

  const cancelPayment = async () => {
    const paymentId = "kakao-payment-28676157-fe33-4243-bffe-bc842bfc2003";
    
    const response = await apiFetch(`/payment/cancel`,{
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "access" : localStorage.getItem("access")
      },
      body: JSON.stringify({
        paymentId,
      }),
    });

    if (response.status === 201) {
      alert("결제 취소 성공");
    }
  }
  
  return (
    <div>
      <h1>결제 테스트</h1>
      <button onClick={kaKaoPaymentAlert}>카카오결제</button>
      <button onClick={tossPaymentAlert}>토스결제</button>
      <button onClick={cancelPayment}>결제취소</button>
    </div>
  )
}

export default Payment;