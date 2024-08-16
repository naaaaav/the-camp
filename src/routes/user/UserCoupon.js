import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cancelFlagAtom } from '../../recoil/atom/UserAtom';
import apiFetch from '../../utils/api';
import './UserCoupon.css'; // CSS 파일을 import 합니다.

const UserCoupons = () => {
  const cancelFlag = useRecoilValue(cancelFlagAtom);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log(inventories);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        
        if (!token) {
          throw new Error('Unauthorized');
        }

        const response = await apiFetch('/user/inventory', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);  
        setInventories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, [cancelFlag]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-coupons-container">
      <h2 className="user-coupons-title">쿠폰 목록</h2>
      <hr />
        <table>
          <thead>
            <tr>
              <th>쿠폰 이름</th>
              <th>쿠폰 타입</th>
              <th>할인 금액</th>
              <th>만료 기간</th>
              <th>사용 여부</th>  
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.seq}>
                <td>{inventory.couponName}</td>
                <td>{inventory.couponType}</td>
                <td>{inventory.count}</td>
                <td>{inventory.expireDate}</td>
                <td>{inventory.use ? '사용됨' : '미사용'}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default UserCoupons;
