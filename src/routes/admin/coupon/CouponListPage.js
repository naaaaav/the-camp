import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../../../recoil/atom/UserAtom';
import apiFetch from '../../../utils/api'; 
import styles from '../../../styles/admin/coupon/CouponListPage.module.css';

const CouponListPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const navigate = useNavigate();
  const role = useRecoilValue(roleAtom);

  useEffect(() => {
    if (role !== 'ROLE_ADMIN') {
      navigate('/'); 
      return;
    }

    const fetchCoupons = async () => {
      try {
        const response = await apiFetch('/coupons' , {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        }
        });
        const data = await response.json();
        setCoupons(data.content);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, [role, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedCoupons.map(id =>
          apiFetch(`/coupons/${id}`, {
            method: 'DELETE',
          })
        )
      );
      setCoupons(coupons.filter(coupon => !selectedCoupons.includes(coupon.seq)));
      setSelectedCoupons([]);
    } catch (error) {
      console.error('Error deleting coupons:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCoupons(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(couponId => couponId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className={styles.couponListPage}>
      <h2>쿠폰 목록</h2>
      <table className={styles.couponTable}>
        <thead>
          <tr>
            <th></th>
            <th>쿠폰명</th>
            <th>쿠폰타입</th>
            <th>쿠폰 유효기간</th>
            <th>쿠폰 할인금액</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(coupon => (
            <tr key={coupon.seq}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCoupons.includes(coupon.seq)}
                  onChange={() => handleCheckboxChange(coupon.seq)}
                />
              </td>
              <td>{coupon.name}</td>
              <td>{coupon.type}</td>
              <td>{formatDate(coupon.expireDate)}</td>
              <td>{coupon.discountRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate('/admin/coupons/create')} className={styles.addButton}>
          쿠폰 추가
        </button>
        <button 
          onClick={handleDeleteSelected} 
          className={styles.deleteButton}
          disabled={selectedCoupons.length === 0}
        >
          쿠폰 삭제
        </button>
      </div>
    </div>
  );
};

export default CouponListPage;
