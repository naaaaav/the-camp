import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../../../utils/api'; 
import styles from '../../../styles/admin/coupon/CouponCreatePage.module.css';

const CouponCreatePage = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('NEW_MEMBER');
    const [discountRate, setDiscountRate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 할인율 값 검증
        if (discountRate === '' || isNaN(discountRate)) {
            alert('할인율은 유효한 숫자여야 합니다.');
            return;
        }

        const parsedDiscountRate = parseInt(discountRate, 10);

        // 할인율 범위 검증 (0% 이상, 100% 이하)
        if (parsedDiscountRate < 0 || parsedDiscountRate > 100) {
            alert('할인율은 0%에서 100% 사이의 값이어야 합니다.');
            return;
        }

        try {
            const response = await apiFetch('/coupons', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    type,
                    discountRate: parsedDiscountRate, 
                    expireDate,
                }),
            });

            if (response.ok) {
                alert('쿠폰이 성공적으로 추가되었습니다.');
                navigate('/admin/coupons'); 
            } else {
                const errorData = await response.json();
                alert(`쿠폰 추가에 실패했습니다: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error creating coupon:', error.message);
            alert('쿠폰 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.couponCreatePage}>
            <h2>쿠폰 추가</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>쿠폰명</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>쿠폰 타입</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="NEW_MEMBER">신규회원</option>
                        <option value="REGULAR_MEMBER">일반회원</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>할인율 (%)</label>
                    <input
                        type="text"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>만료 날짜</label>
                    <input
                        type="date"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>쿠폰 추가</button>
            </form>
        </div>
    );
};

export default CouponCreatePage;
