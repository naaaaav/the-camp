import apiFetch from '../../utils/api';
  
const cancelPayment = async (paymentId) => {
  const response = await apiFetch(`/payment/cancel`,{
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : localStorage.getItem("Authorization")
    },
    body: JSON.stringify({
      paymentId,
    }),
  });

  if (response.status === 201) {
    alert("결제 취소 성공");
  }
}

export default PaymentCancel;