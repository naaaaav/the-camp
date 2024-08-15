import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../../../utils/api'; 
import styles from '../../../styles/admin/coupon/CouponCreatePage.module.css';

const CouponCreatePage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  useEffect(() => {
    const input = nameInputRef.current;
    if (input) {
      input.lang = 'ko';
      input.setAttribute('inputmode', 'none');

      input.addEventListener('focus', () => {
        if (input.setSelectionRange) {
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCoupon = {
      name,
      type,
      discountRate: parseInt(discountRate, 10),
      expireDate: new Date(expireDate).toISOString(),
    };

    try {
      const response = await apiFetch('/coupons', {
        method: 'POST',
        body: JSON.stringify(newCoupon),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log('Coupon created:', data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error creating coupon:', error);
      alert('쿠폰 생성 실패');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/coupons'); 
  };

  return (
    <div className={styles.couponCreatePage}>
      <h2>쿠폰 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>쿠폰명:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            ref={nameInputRef} 
          />
        </div>
        <div className={styles.formGroup}>
          <label>쿠폰타입:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>쿠폰 할인금액:</label>
          <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>쿠폰 유효기간:</label>
          <input type="date" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>등록하기</button>
      </form>
      {showPopup && (
        <div className={styles.popup}>
          <p>쿠폰 생성 완료</p>
          <button onClick={handlePopupClose} className={styles.popupButton}>확인</button>
        </div>
      )}
    </div>
  );
};

export default CouponCreatePage;
