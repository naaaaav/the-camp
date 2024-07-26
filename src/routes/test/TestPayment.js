import * as PortOne from "@portone/browser-sdk/v2";

const TestPayment = () => {
  
  const kaKaoPaymentAlert = async () => {
    const paymentId = `payment-${crypto.randomUUID()}`;

    const response = await PortOne.requestPayment({
      storeId: "store-5c664fd7-4801-4c86-8776-e090581e64f7",
      channelKey: "channel-key-8cf77eb8-75e9-46b5-9ef4-20f8c575630d",
      paymentId: paymentId,
      orderName: "나이키 와플 트레이너 2 SD",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
    });
  
    if (response.code != null) {
      return alert(response.message);
    }
  
    const notified = await fetch(`http://localhost:8080/payment/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId
      }),
    });
  }

  const TossPaymentAlert = async () => {
    const paymentId = `payment${Math.random().toString(36).slice(2)}`;
    
    const response = await PortOne.requestPayment({
      storeId: "store-5c664fd7-4801-4c86-8776-e090581e64f7",
      channelKey: "channel-key-cc1cc64a-17b1-43b9-b633-7b5516169986",
      paymentId: paymentId,
      orderName: "캠핑톡 캠핑장 예약",
      totalAmount: 1000000,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
    });
  
    if (response.code != null) {
      return alert(response.message);
    }
  
    const notified = await fetch(`http://localhost:8080/payment/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId
      }),
    });
  }
  
  return (
    <div>
      <h1>결제 테스트</h1>
      <button onClick={kaKaoPaymentAlert}>카카오결제</button>
      <button onClick={TossPaymentAlert}>토스결제</button>
    </div>
  )
}

export default TestPayment;