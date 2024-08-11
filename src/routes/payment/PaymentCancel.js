import apiFetch from '../../utils/api';

const PaymentCancel = () => {
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
      <button onClick={cancelPayment}>결제취소</button>
    </div>
  )
}

export default PaymentCancel;